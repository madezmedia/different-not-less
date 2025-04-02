/**
 * Error handling middleware for the Printify MCP server
 */

const logger = require('../utils/logger');

// Not Found error handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.code = 404;
  next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = err.code || 500;
  
  // Log error details
  logger.error(`Error [${statusCode}]: ${err.message}`, {
    method: req.method,
    path: req.path,
    error: err.stack
  });
  
  // Send structured error response
  res.status(statusCode).json({
    code: statusCode,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = {
  notFound,
  errorHandler
};
