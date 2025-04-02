/**
 * Printify API service
 * Responsible for making calls to the Printify API
 */

const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

class PrintifyService {
  constructor() {
    this.apiUrl = config.printify.apiUrl;
    this.apiKey = config.printify.apiKey;
    
    // Configure axios instance with default headers and base URL
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response.data,
      error => this.handleApiError(error)
    );
  }
  
  // Error handling for API requests
  handleApiError(error) {
    // Extract error details
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'Unknown error';
    const details = error.response?.data || {};
    
    // Log the error
    logger.error(`Printify API Error: ${message}`, {
      status,
      details,
      stack: error.stack
    });
    
    // Build error object
    const apiError = new Error(message);
    apiError.code = status;
    apiError.details = details;
    
    // Throw the formatted error
    throw apiError;
  }
  
  // Shop endpoints
  async getShops() {
    return this.client.get('/shops');
  }
  
  async getShopById(shopId) {
    return this.client.get(`/shops/${shopId}`);
  }
  
  // Product endpoints
  async getProducts(shopId) {
    return this.client.get(`/shops/${shopId}/products`);
  }
  
  async getProductById(shopId, productId) {
    return this.client.get(`/shops/${shopId}/products/${productId}`);
  }
  
  async createProduct(shopId, productData) {
    return this.client.post(`/shops/${shopId}/products`, productData);
  }
  
  async updateProduct(shopId, productId, productData) {
    return this.client.put(`/shops/${shopId}/products/${productId}`, productData);
  }
  
  async deleteProduct(shopId, productId) {
    return this.client.delete(`/shops/${shopId}/products/${productId}`);
  }
  
  // Print provider endpoints
  async getPrintProviders() {
    return this.client.get('/print_providers');
  }
  
  async getPrintProviderById(providerId) {
    return this.client.get(`/print_providers/${providerId}`);
  }
  
  async getPrintProviderBlueprints(providerId) {
    return this.client.get(`/print_providers/${providerId}/blueprints`);
  }
  
  // Publishing endpoints
  async publishProduct(shopId, productId, publishData) {
    return this.client.post(`/shops/${shopId}/products/${productId}/publish`, publishData);
  }
  
  // Order endpoints
  async getOrders(shopId) {
    return this.client.get(`/shops/${shopId}/orders`);
  }
  
  async getOrderById(shopId, orderId) {
    return this.client.get(`/shops/${shopId}/orders/${orderId}`);
  }
  
  async createOrder(shopId, orderData) {
    return this.client.post(`/shops/${shopId}/orders`, orderData);
  }
  
  async updateOrder(shopId, orderId, orderData) {
    return this.client.put(`/shops/${shopId}/orders/${orderId}`, orderData);
  }
}

// Export singleton instance
module.exports = new PrintifyService();