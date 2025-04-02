/**
 * Shops route handlers
 */

const express = require('express');
const router = express.Router();
const printifyService = require('../services/printify');
const logger = require('../utils/logger');

// Import sub-routes
const productsRoutes = require('./products');
const ordersRoutes = require('./orders');

/**
 * @route   GET /api/v1/shops
 * @desc    Get all shops
 */
router.get('/', async (req, res, next) => {
  try {
    logger.debug('Fetching all shops');
    const shops = await printifyService.getShops();
    res.json(shops);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/shops/:shop_id
 * @desc    Get shop by ID
 */
router.get('/:shop_id', async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    logger.debug(`Fetching shop with ID: ${shop_id}`);
    
    const shop = await printifyService.getShopById(shop_id);
    res.json(shop);
  } catch (error) {
    next(error);
  }
});

// Mount sub-routes
router.use('/:shop_id/products', productsRoutes);
router.use('/:shop_id/orders', ordersRoutes);

module.exports = router;
