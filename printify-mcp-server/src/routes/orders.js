/**
 * Orders route handlers
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // To access parent route params
const printifyService = require('../services/printify');
const logger = require('../utils/logger');

/**
 * @route   GET /api/v1/shops/:shop_id/orders
 * @desc    Get all orders for a shop
 */
router.get('/', async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    logger.debug(`Fetching all orders for shop ID: ${shop_id}`);
    
    const orders = await printifyService.getOrders(shop_id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/v1/shops/:shop_id/orders
 * @desc    Create a new order
 */
router.post('/', async (req, res, next) => {
  try {
    const { shop_id } = req.params;
    const orderData = req.body;
    
    logger.debug(`Creating new order for shop ID: ${shop_id}`);
    logger.debug('Order data:', { orderData });
    
    const newOrder = await printifyService.createOrder(shop_id, orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/shops/:shop_id/orders/:order_id
 * @desc    Get order by ID
 */
router.get('/:order_id', async (req, res, next) => {
  try {
    const { shop_id, order_id } = req.params;
    logger.debug(`Fetching order ID: ${order_id} from shop ID: ${shop_id}`);
    
    const order = await printifyService.getOrderById(shop_id, order_id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/v1/shops/:shop_id/orders/:order_id
 * @desc    Update an order
 */
router.put('/:order_id', async (req, res, next) => {
  try {
    const { shop_id, order_id } = req.params;
    const orderData = req.body;
    
    logger.debug(`Updating order ID: ${order_id} in shop ID: ${shop_id}`);
    
    const updatedOrder = await printifyService.updateOrder(shop_id, order_id, orderData);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
