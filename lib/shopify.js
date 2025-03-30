import Client from 'shopify-buy';

// Initialize a Shopify client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
});

/**
 * Fetch all products from Shopify
 * @returns {Promise<Array>} Array of products
 */
export async function getAllProducts() {
  try {
    const products = await client.product.fetchAll();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

/**
 * Fetch a single product by handle
 * @param {string} handle - The product handle
 * @returns {Promise<Object>} Product object
 */
export async function getProductByHandle(handle) {
  try {
    const product = await client.product.fetchByHandle(handle);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
}

/**
 * Fetch products by collection
 * @param {string} collectionId - The collection ID
 * @returns {Promise<Array>} Array of products in the collection
 */
export async function getProductsByCollection(collectionId) {
  try {
    const collection = await client.collection.fetchWithProducts(collectionId);
    return JSON.parse(JSON.stringify(collection.products));
  } catch (error) {
    console.error(`Error fetching products for collection ${collectionId}:`, error);
    return [];
  }
}

/**
 * Create a checkout with line items
 * @param {Array} lineItems - Array of line items to add to checkout
 * @returns {Promise<Object>} Checkout object
 */
export async function createCheckout(lineItems = []) {
  try {
    const checkout = await client.checkout.create();
    
    if (lineItems.length > 0) {
      await client.checkout.addLineItems(checkout.id, lineItems);
    }
    
    return checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

/**
 * Add items to an existing checkout
 * @param {string} checkoutId - The checkout ID
 * @param {Array} lineItems - Array of line items to add
 * @returns {Promise<Object>} Updated checkout object
 */
export async function addItemsToCheckout(checkoutId, lineItems) {
  try {
    const checkout = await client.checkout.addLineItems(checkoutId, lineItems);
    return checkout;
  } catch (error) {
    console.error('Error adding items to checkout:', error);
    return null;
  }
}

/**
 * Remove items from an existing checkout
 * @param {string} checkoutId - The checkout ID
 * @param {Array} lineItemIds - Array of line item IDs to remove
 * @returns {Promise<Object>} Updated checkout object
 */
export async function removeItemsFromCheckout(checkoutId, lineItemIds) {
  try {
    const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIds);
    return checkout;
  } catch (error) {
    console.error('Error removing items from checkout:', error);
    return null;
  }
}

export default client;
