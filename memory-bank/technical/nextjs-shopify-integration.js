// lib/shopify.js - Shopify integration utilities

import Client from 'shopify-buy';
import { createContext, useContext, useEffect, useState } from 'react';

// Initialize Shopify Client
let shopifyClient;

export function getShopifyClient() {
  if (shopifyClient) return shopifyClient;
  
  shopifyClient = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  });
  
  return shopifyClient;
}

// ----------- Cart Functionality -----------

// Create a checkout
export async function createCheckout() {
  const client = getShopifyClient();
  return client.checkout.create();
}

// Add items to checkout
export async function addItemsToCheckout(checkoutId, lineItems) {
  const client = getShopifyClient();
  return client.checkout.addLineItems(checkoutId, lineItems);
}

// Update items in checkout
export async function updateLineItems(checkoutId, lineItems) {
  const client = getShopifyClient();
  return client.checkout.updateLineItems(checkoutId, lineItems);
}

// Remove items from checkout
export async function removeLineItems(checkoutId, lineItemIds) {
  const client = getShopifyClient();
  return client.checkout.removeLineItems(checkoutId, lineItemIds);
}

// ----------- Product Functionality -----------

// Fetch a single product by handle (slug)
export async function getProductByHandle(handle) {
  const client = getShopifyClient();
  return client.product.fetchByHandle(handle);
}

// Fetch a single product by ID
export async function getProductById(id) {
  const client = getShopifyClient();
  return client.product.fetch(id);
}

// Fetch products in a collection
export async function getProductsInCollection(collectionId) {
  const client = getShopifyClient();
  return client.collection.fetchWithProducts(collectionId, { productsFirst: 25 });
}

// Fetch all products (paginated)
export async function getAllProducts(count = 20) {
  const client = getShopifyClient();
  return client.product.fetchAll(count);
}

// ----------- Collection Functionality -----------

// Fetch a collection by handle
export async function getCollectionByHandle(handle) {
  const client = getShopifyClient();
  return client.collection.fetchByHandle(handle);
}

// Fetch all collections
export async function getAllCollections() {
  const client = getShopifyClient();
  return client.collection.fetchAll();
}

// ----------- Cart Context -----------

// Create Context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize checkout
  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        // Check if we already have a checkout ID in local storage
        const existingCheckoutId = localStorage.getItem('checkoutId');
        
        if (existingCheckoutId) {
          const client = getShopifyClient();
          // Verify the checkout still exists and is valid
          const checkout = await client.checkout.fetch(existingCheckoutId);
          
          if (checkout && !checkout.completedAt) {
            setCheckoutId(existingCheckoutId);
            setCart(checkout);
            setCheckoutUrl(checkout.webUrl);
            return;
          }
        }

        // If no checkout ID in local storage or it's invalid, create a new one
        const newCheckout = await createCheckout();
        localStorage.setItem('checkoutId', newCheckout.id);
        setCheckoutId(newCheckout.id);
        setCart(newCheckout);
        setCheckoutUrl(newCheckout.webUrl);
      } catch (error) {
        console.error("Error initializing checkout:", error);
        setError(error);
      }
    };

    initializeCheckout();
  }, []);

  // Add an item to the cart
  const addItemToCart = async (variantId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure we have a checkout
      let currentCheckoutId = checkoutId;
      if (!currentCheckoutId) {
        const newCheckout = await createCheckout();
        localStorage.setItem('checkoutId', newCheckout.id);
        currentCheckoutId = newCheckout.id;
        setCheckoutId(currentCheckoutId);
      }

      // Add the item to the checkout
      const lineItems = [{ variantId, quantity }];
      const newCheckout = await addItemsToCheckout(currentCheckoutId, lineItems);
      
      setCart(newCheckout);
      setCheckoutUrl(newCheckout.webUrl);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  // Update an item in the cart
  const updateItemInCart = async (lineItemId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const lineItems = [{ id: lineItemId, quantity }];
      const newCheckout = await updateLineItems(checkoutId, lineItems);
      
      setCart(newCheckout);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error updating item in cart:", error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  // Remove an item from the cart
  const removeItemFromCart = async (lineItemId) => {
    setLoading(true);
    setError(null);

    try {
      const newCheckout = await removeLineItems(checkoutId, [lineItemId]);
      
      setCart(newCheckout);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  // Clear the cart
  const clearCart = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get all line item IDs
      const lineItemIds = cart.lineItems.map(item => item.id);
      
      // Remove all line items
      if (lineItemIds.length > 0) {
        const newCheckout = await removeLineItems(checkoutId, lineItemIds);
        setCart(newCheckout);
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      checkoutUrl,
      loading,
      error,
      addItemToCart,
      updateItemInCart,
      removeItemFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  return useContext(CartContext);
}

// ----------- Shopify Admin API Utilities -----------

// Note: These functions should be used in API routes only, not in client-side code

// Helper to make Shopify Admin API requests
export async function shopifyAdminRequest(endpoint, method = 'GET', data = null) {
  const url = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-01/${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
    }
  };
  
  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }
  
  return response.json();
}

// Create a product in Shopify
export async function createShopifyProduct(productData) {
  return shopifyAdminRequest('products.json', 'POST', { product: productData });
}

// Update a product in Shopify
export async function updateShopifyProduct(productId, productData) {
  return shopifyAdminRequest(`products/${productId}.json`, 'PUT', { product: productData });
}

// Get a product from Shopify Admin API
export async function getShopifyProductById(productId) {
  return shopifyAdminRequest(`products/${productId}.json`);
}

// Create a collection in Shopify
export async function createShopifyCollection(collectionData) {
  return shopifyAdminRequest('custom_collections.json', 'POST', { custom_collection: collectionData });
}

// Add a product to a collection
export async function addProductToCollection(collectionId, productId) {
  return shopifyAdminRequest('collects.json', 'POST', {
    collect: {
      collection_id: collectionId,
      product_id: productId
    }
  });
}

// Example API route for syncing a product from Airtable/Sanity to Shopify
// pages/api/sync-product.js
export async function syncProductToShopify(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { product } = req.body;
    
    // Prepare product data for Shopify
    const shopifyProductData = {
      title: product.title,
      body_html: product.description,
      vendor: 'Different Not Less Apparel',
      product_type: product.productType,
      tags: product.tags || [],
      variants: product.variants.map(variant => ({
        option1: variant.size,
        option2: variant.color,
        price: variant.price,
        sku: variant.sku,
        inventory_management: 'shopify',
        inventory_quantity: variant.inventoryCount
      })),
      options: [
        { name: 'Size' },
        { name: 'Color' }
      ],
      images: product.images.map(image => ({
        src: image.url
      }))
    };
    
    let shopifyProduct;
    
    // If the product already exists in Shopify, update it
    if (product.shopifyProductId) {
      shopifyProduct = await updateShopifyProduct(
        product.shopifyProductId,
        shopifyProductData
      );
    } else {
      // Otherwise create a new product
      shopifyProduct = await createShopifyProduct(shopifyProductData);
      
      // If the product was created successfully, store the Shopify ID
      if (shopifyProduct.product && shopifyProduct.product.id) {
        // Update product in Sanity/Airtable with the Shopify ID
        // This would be implemented according to your data storage approach
      }
    }
    
    // Add the product to relevant collections
    if (product.collections && product.collections.length > 0) {
      for (const collection of product.collections) {
        if (collection.shopifyCollectionId) {
          await addProductToCollection(
            collection.shopifyCollectionId,
            shopifyProduct.product.id
          );
        }
      }
    }
    
    return res.status(200).json({ success: true, shopifyProduct });
  } catch (error) {
    console.error('Error syncing product to Shopify:', error);
    return res.status(500).json({ error: error.message });
  }
}
