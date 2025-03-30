// pages/api/sync/airtable-to-shopify.js
// This API route handles synchronization from Airtable to Shopify

import Airtable from 'airtable';
import { 
  createShopifyProduct, 
  updateShopifyProduct, 
  getShopifyProductById, 
  addProductToCollection 
} from '../../../lib/shopify';
import { sanityClient } from '../../../lib/sanity';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

/**
 * API route handler for syncing products from Airtable to Shopify
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Extract parameters from request
    const { recordId, fullSync = false } = req.body;
    
    // If recordId is provided, sync only that record
    // Otherwise, sync all records if fullSync is true
    if (recordId) {
      const result = await syncSingleProduct(recordId);
      return res.status(200).json(result);
    } else if (fullSync) {
      const results = await syncAllProducts();
      return res.status(200).json(results);
    } else {
      return res.status(400).json({ error: 'Either recordId or fullSync parameter is required' });
    }
  } catch (error) {
    console.error('Error in Airtable-Shopify sync:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * Sync a single product from Airtable to Shopify
 * @param {string} recordId - Airtable record ID
 * @returns {Object} Result of the sync operation
 */
async function syncSingleProduct(recordId) {
  try {
    // Fetch product data from Airtable
    const record = await base('Products').find(recordId);
    
    if (!record) {
      throw new Error(`Record with ID ${recordId} not found in Airtable`);
    }
    
    // Convert Airtable record to Shopify format
    const shopifyData = await convertAirtableToShopify(record);
    
    // Check if product already exists in Shopify
    const existingShopifyId = record.get('Shopify Product ID');
    let result;
    
    if (existingShopifyId) {
      // Update existing product
      result = await updateShopifyProduct(existingShopifyId, shopifyData);
      await syncProductToCollections(existingShopifyId, record);
      
      return {
        success: true,
        action: 'updated',
        shopifyProductId: existingShopifyId,
        product: record.get('Product Name')
      };
    } else {
      // Create new product
      const shopifyResponse = await createShopifyProduct(shopifyData);
      const newShopifyId = shopifyResponse.product.id;
      
      // Update Airtable record with Shopify ID
      await base('Products').update(recordId, {
        'Shopify Product ID': newShopifyId.toString()
      });
      
      // Sync to collections
      await syncProductToCollections(newShopifyId, record);
      
      // Update Sanity with Shopify ID if we have a Sanity Document ID
      const sanityDocId = record.get('Sanity Document ID');
      if (sanityDocId) {
        await sanityClient.patch(sanityDocId)
          .set({ shopifyProductId: newShopifyId.toString() })
          .commit();
      }
      
      return {
        success: true,
        action: 'created',
        shopifyProductId: newShopifyId,
        product: record.get('Product Name')
      };
    }
  } catch (error) {
    console.error(`Error syncing product ${recordId}:`, error);
    return {
      success: false,
      recordId,
      error: error.message
    };
  }
}

/**
 * Sync all products from Airtable to Shopify
 * @returns {Object} Results of the sync operation
 */
async function syncAllProducts() {
  try {
    // Fetch all active products from Airtable
    const records = await base('Products')
      .select({
        filterByFormula: "{Status} = 'Available'",
        sort: [{ field: 'Product Name', direction: 'asc' }]
      })
      .all();
    
    // Process each record
    const results = {
      total: records.length,
      created: 0,
      updated: 0,
      failed: 0,
      details: []
    };
    
    for (const record of records) {
      const result = await syncSingleProduct(record.id);
      
      if (result.success) {
        if (result.action === 'created') {
          results.created++;
        } else if (result.action === 'updated') {
          results.updated++;
        }
      } else {
        results.failed++;
      }
      
      results.details.push(result);
    }
    
    return results;
  } catch (error) {
    console.error('Error syncing all products:', error);
    throw error;
  }
}

/**
 * Sync product to Shopify collections based on Airtable collections
 * @param {string} shopifyProductId - Shopify product ID
 * @param {Object} airtableRecord - Airtable record
 */
async function syncProductToCollections(shopifyProductId, airtableRecord) {
  try {
    // Get collections from Airtable
    const collections = airtableRecord.get('Collections');
    
    if (!collections || collections.length === 0) {
      return; // No collections to sync
    }
    
    // Fetch collection mappings from Airtable
    const collectionRecords = await base('Collection Mappings')
      .select({
        filterByFormula: `OR(${collections.map(c => `{Collection Name} = '${c}'`).join(',')})`
      })
      .all();
    
    // Add product to each collection
    for (const collectionRecord of collectionRecords) {
      const shopifyCollectionId = collectionRecord.get('Shopify Collection ID');
      
      if (shopifyCollectionId) {
        await addProductToCollection(shopifyCollectionId, shopifyProductId);
      }
    }
  } catch (error) {
    console.error(`Error syncing collections for product ${shopifyProductId}:`, error);
    throw error;
  }
}

/**
 * Convert Airtable record to Shopify product format
 * @param {Object} record - Airtable record
 * @returns {Object} Shopify product data
 */
async function convertAirtableToShopify(record) {
  // Get variant records linked to this product
  const variantRecords = await base('Inventory')
    .select({
      filterByFormula: `{Product} = '${record.id}'`
    })
    .all();
  
  // Map variants to Shopify format
  const variants = variantRecords.map(variantRecord => {
    return {
      option1: variantRecord.get('Size'), // Size
      option2: variantRecord.get('Color'), // Color
      price: record.get('Price') || '24.99',
      sku: variantRecord.get('Variant ID') || generateSku(record, variantRecord),
      inventory_management: 'shopify',
      inventory_quantity: variantRecord.get('Inventory Count') || 0
    };
  });
  
  // Get image URLs
  const mainImage = record.get('Main Image');
  const additionalImages = record.get('Additional Images') || [];
  
  const images = [
    ...(mainImage ? [{ src: mainImage[0].url }] : []),
    ...additionalImages.map(img => ({ src: img.url }))
  ];
  
  // Prepare product data for Shopify
  return {
    title: record.get('Product Name'),
    body_html: record.get('Description') || '',
    vendor: 'Different Not Less Apparel',
    product_type: record.get('Product Type') || 'T-Shirt',
    tags: getProductTags(record),
    variants,
    options: [
      { name: 'Size' },
      { name: 'Color' }
    ],
    images,
    status: record.get('Status') === 'Available' ? 'active' : 'draft'
  };
}

/**
 * Generate a SKU based on product details
 * @param {Object} productRecord - Airtable product record
 * @param {Object} variantRecord - Airtable variant record
 * @returns {string} Generated SKU
 */
function generateSku(productRecord, variantRecord) {
  const productType = productRecord.get('Product Type') || 'TS';
  const productName = productRecord.get('Product Name') || '';
  const nameAbbrev = productName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 3)
    .toUpperCase();
  
  const color = variantRecord.get('Color') || '';
  const colorCode = color.charAt(0).toUpperCase();
  
  const size = variantRecord.get('Size') || '';
  
  return `DNL-${productType.substring(0, 2).toUpperCase()}-${nameAbbrev}-${colorCode}${size}`;
}

/**
 * Get product tags from Airtable record
 * @param {Object} record - Airtable record
 * @returns {string[]} Array of tags
 */
function getProductTags(record) {
  const tags = [];
  
  // Add collections as tags
  const collections = record.get('Collections') || [];
  collections.forEach(collection => {
    tags.push(collection);
  });
  
  // Add product type as tag
  const productType = record.get('Product Type');
  if (productType) {
    tags.push(productType);
  }
  
  // Add featured and new arrival tags if applicable
  if (record.get('Featured Product')) {
    tags.push('featured');
  }
  
  if (record.get('New Arrival')) {
    tags.push('new-arrival');
  }
  
  // Add default tags
  tags.push('different-not-less');
  
  return tags;
}

// pages/api/webhooks/airtable-change.js
// Webhook endpoint for Airtable automation to trigger sync

export function airtableWebhook(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Verify the webhook signature if applicable
    // This would depend on how Airtable's webhook is configured
    
    const { recordId, action } = req.body;
    
    if (!recordId) {
      return res.status(400).json({ error: 'recordId is required' });
    }
    
    // Acknowledge the webhook quickly
    res.status(200).json({ received: true });
    
    // Process the sync asynchronously
    processSyncFromWebhook(recordId, action);
  } catch (error) {
    console.error('Error in Airtable webhook handler:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * Process sync request from webhook asynchronously
 * @param {string} recordId - Airtable record ID
 * @param {string} action - Action that triggered the webhook
 */
async function processSyncFromWebhook(recordId, action) {
  try {
    // For created or updated records, sync to Shopify
    if (action === 'create' || action === 'update') {
      await syncSingleProduct(recordId);
    }
    // For deleted records, we would need to update Shopify accordingly
    // This would depend on your business logic
  } catch (error) {
    console.error(`Error processing webhook sync for record ${recordId}:`, error);
  }
}
