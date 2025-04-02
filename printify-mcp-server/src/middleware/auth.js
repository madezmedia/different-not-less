/**
 * Authentication middleware for the Printify MCP server
 */

const config = require('../config');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // No auth header provided
  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: 'Authentication required'
    });
  }
  
  // Check if it's a Bearer token
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid authentication format'
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  // Simple token validation for now
  // In a production environment, this would validate against stored API keys
  // or perform OAuth validation
  if (!token || token !== process.env.API_KEY) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid or expired API key'
    });
  }
  
  // Authentication successful, proceed
  next();
};

module.exports = { authenticate };
