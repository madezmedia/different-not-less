/**
 * Print Providers route handlers
 */

const express = require('express');
const router = express.Router();
const printifyService = require('../services/printify');
const logger = require('../utils/logger');

/**
 * @route   GET /api/v1/print_providers
 * @desc    Get all print providers
 */
router.get('/', async (req, res, next) => {
  try {
    logger.debug('Fetching all print providers');
    const providers = await printifyService.getPrintProviders();
    res.json(providers);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/print_providers/:provider_id
 * @desc    Get print provider by ID
 */
router.get('/:provider_id', async (req, res, next) => {
  try {
    const { provider_id } = req.params;
    logger.debug(`Fetching print provider with ID: ${provider_id}`);
    
    const provider = await printifyService.getPrintProviderById(provider_id);
    res.json(provider);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/print_providers/:provider_id/blueprints
 * @desc    Get all blueprints for a print provider
 */
router.get('/:provider_id/blueprints', async (req, res, next) => {
  try {
    const { provider_id } = req.params;
    logger.debug(`Fetching blueprints for print provider ID: ${provider_id}`);
    
    const blueprints = await printifyService.getPrintProviderBlueprints(provider_id);
    res.json(blueprints);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
