/**
 * Publishing route handlers
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // To access parent route params
const printifyService = require('../services/printify');
const logger = require('../utils/logger');

/**
 * @route   POST /api/v1/shops/:shop_id/products/:product_id/publish
 * @desc    Publish a product to a sales channel
 */
router.post('/', async (req, res, next) => {
  try {
    const { shop_id, product_id } = req.params;
    const publishData = req.body;
    
    logger.debug(`Publishing product ID: ${product_id} from shop ID: ${shop_id}`);
    logger.debug('Publish data:', { publishData });
    
    const result = await printifyService.publishProduct(shop_id, product_id, publishData);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
