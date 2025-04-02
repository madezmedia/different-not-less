/**
 * Main server file for the Printify MCP server
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const config = require('./config');
const logger = require('./utils/logger');
const { authenticate } = require('./middleware/auth');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Import route handlers
const shopsRoutes = require('./routes/shops');
const productsRoutes = require('./routes/products');
const printProvidersRoutes = require('./routes/printProviders');
const publishingRoutes = require('./routes/publishing');
const ordersRoutes = require('./routes/orders');

// Initialize Express app
const app = express();

// Load OpenAPI specification
const openApiPath = path.join(__dirname, '../config/openapi.yaml');
const openApiDocument = YAML.parse(fs.readFileSync(openApiPath, 'utf8'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// OpenAPI validation middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true, 
    validateResponses: true
  })
);

// Authentication middleware
app.use('/api/v1', authenticate);

// Mount API routes
app.use('/api/v1/shops', shopsRoutes);
app.use('/api/v1/print_providers', printProvidersRoutes);
// Products routes are mounted within shops routes
// Publishing routes are mounted within shops/products routes
// Orders routes are mounted within shops routes

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  logger.info(`Server running in ${config.server.env} mode on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; // Export for testing
