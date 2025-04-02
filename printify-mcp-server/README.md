# Printify MCP Server

This is a Node.js OpenAPI MCP (Model Control Protocol) server implementation for Printify API integration. It provides a standardized interface for interacting with Printify's API services for product creation, inventory management, and order processing.

## Features

- RESTful API following OpenAPI 3.0 specification
- Authentication and authorization
- Comprehensive error handling
- Logging and monitoring
- Swagger UI API documentation

## API Endpoints

The server exposes the following key endpoints:

### Shop Endpoints
- `GET /api/v1/shops` - List all shops
- `GET /api/v1/shops/{shop_id}` - Get shop details

### Product Endpoints
- `GET /api/v1/shops/{shop_id}/products` - List all products
- `POST /api/v1/shops/{shop_id}/products` - Create a product
- `GET /api/v1/shops/{shop_id}/products/{product_id}` - Get product details
- `PUT /api/v1/shops/{shop_id}/products/{product_id}` - Update a product
- `DELETE /api/v1/shops/{shop_id}/products/{product_id}` - Delete a product

### Print Provider Endpoints
- `GET /api/v1/print_providers` - List all print providers
- `GET /api/v1/print_providers/{provider_id}` - Get provider details
- `GET /api/v1/print_providers/{provider_id}/blueprints` - Get provider blueprints

### Publishing Endpoints
- `POST /api/v1/shops/{shop_id}/products/{product_id}/publish` - Publish a product

### Order Endpoints
- `GET /api/v1/shops/{shop_id}/orders` - List all orders
- `POST /api/v1/shops/{shop_id}/orders` - Create an order
- `GET /api/v1/shops/{shop_id}/orders/{order_id}` - Get order details
- `PUT /api/v1/shops/{shop_id}/orders/{order_id}` - Update an order

## Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd printify-mcp-server
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your Printify API credentials and other configuration options.

### Running the Server

Development mode with automatic reloading:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

Once the server is running, you can access the Swagger UI API documentation at:
```
http://localhost:3000/api-docs
```

## Testing

Run tests:
```bash
npm test
```

## Project Structure

```
printify-mcp-server/
├── config/
│   └── openapi.yaml      # OpenAPI specification
├── src/
│   ├── config.js         # Application configuration
│   ├── server.js         # Express server setup
│   ├── middleware/       # Express middleware
│   │   ├── auth.js       # Authentication middleware
│   │   └── errorHandler.js # Error handling middleware
│   ├── routes/           # API route handlers
│   │   ├── shops.js
│   │   ├── products.js
│   │   ├── printProviders.js
│   │   ├── publishing.js
│   │   └── orders.js
│   ├── services/         # Business logic and external API calls
│   │   └── printify.js   # Printify API service
│   └── utils/            # Utility functions
│       └── logger.js     # Logging utility
├── test/                 # Test files
├── .env.example          # Example environment variables
├── .gitignore
├── index.js              # Application entry point
├── package.json
└── README.md
```

## Integration with Different Not Less

This MCP server integrates with the Different Not Less platform, providing standardized access to Printify's API services for product creation, inventory management, and order processing. It works in conjunction with n8n workflows, Airtable, and Shopify integration to automate product lifecycle processes.

## License

ISC