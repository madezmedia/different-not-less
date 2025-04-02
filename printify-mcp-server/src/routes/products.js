/**
 * Products route handlers
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // To access parent route params
const printifyService = require('../services/printify');
const logger = require('../utils/logger');

// Import sub-routes
const publishingRoutes = require('./publishing');

/**
 * @route   GET /api/v1/shops/:shop_id/products
 * @desc    Get all products for a shop
 */
router.get('/', async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    logger.debug(`Fetching all products for shop ID: ${shop_id}`);
    
    const products = await printifyService.getProducts(shop_id);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/v1/shops/:shop_id/products
 * @desc    Create a new product
 */
router.post('/', async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const productData = req.body;
    
    logger.debug(`Creating new product for shop ID: ${shop_id}`);
    logger.debug('Product data:', { productData });
    
    const newProduct = await printifyService.createProduct(shop_id, productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/shops/:shop_id/products/:product_id
 * @desc    Get product by ID
 */
router.get('/:product_id', async (req, res, next) => {
  try {
    const { shop_id, product_id } = req.params;
    logger.debug(`Fetching product ID: ${product_id} from shop ID: ${shop_id}`);
    
    const product = await printifyService.getProductById(shop_id, product_id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/v1/shops/:shop_id/products/:product_id
 * @desc    Update a product
 */
router.put('/:product_id', async (req, res, next) => {
  try {
    const { shop_id, product_id } = req.params;
    const productData = req.body;
    
    logger.debug(`Updating product ID: ${product_id} in shop ID: ${shop_id}`);
    
    const updatedProduct = await printifyService.updateProduct(shop_id, product_id, productData);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/v1/shops/:shop_id/products/:product_id
 * @desc    Delete a product
 */
router.delete('/:product_id', async (req, res, next) => {
  try {
    const { shop_id, product_id } = req.params;
    logger.debug(`Deleting product ID: ${product_id} from shop ID: ${shop_id}`);
    
    await printifyService.deleteProduct(shop_id, product_id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Mount sub-routes
router.use('/:product_id/publish', publishingRoutes);

module.exports = router;
