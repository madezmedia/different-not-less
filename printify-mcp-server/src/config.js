require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  printify: {
    apiKey: process.env.PRINTIFY_API_KEY,
    apiUrl: process.env.PRINTIFY_API_URL || 'https://api.printify.com/v1'
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

module.exports = config;
