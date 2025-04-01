# Different Not Less Apparel - n8n Workflow

This directory contains a complete n8n workflow for automating the product creation process for Different Not Less Apparel. The workflow connects fal.ai image generation with Printify, Shopify, and Airtable to streamline the product creation process.

## Directory Contents

- **product-creation-workflow.json**: The main n8n workflow definition file that can be imported into n8n
- **docker-compose.yml**: Docker Compose configuration for running n8n in a container
- **.env.example**: Template for environment variables needed by the workflow
- **setup.sh**: Setup script to help you get started with the workflow
- **test-workflow.js**: Node.js script for testing the workflow

## Quick Start

1. Make sure you have Docker and Docker Compose installed
2. Run the setup script:
   ```
   ./setup.sh
   ```
3. Follow the prompts to configure your environment variables
4. Access the n8n editor at http://localhost:5678
5. Import the workflow and set up your credentials
6. Activate the workflow
7. Test the workflow using the test script:
   ```
   ./test-workflow.js
   ```

## Detailed Documentation

For more detailed information about the workflow, including setup instructions, testing guidance, and customization options, please refer to the [Workflow Documentation](./WORKFLOW.md).

## Workflow Overview

The workflow handles the following process:

1. Receives design prompts and product specifications via a webhook
2. Validates the input data
3. Generates t-shirt designs using fal.ai's image generation API
4. Creates products in Printify with the generated designs
5. Publishes the products to Shopify
6. Updates the Airtable inventory database

## Prerequisites

- Docker and Docker Compose
- API credentials for:
  - fal.ai
  - Printify
  - Airtable
- Node.js (optional, for running the test script)

## Environment Variables

The workflow requires the following environment variables:

- `WEBHOOK_API_KEY`: API key for authenticating webhook requests
- `FALAI_API_KEY`: API key for fal.ai image generation
- `PRINTIFY_API_KEY`: API key for Printify
- `PRINTIFY_SHOP_ID`: Your Printify shop ID
- `AIRTABLE_API_KEY`: API key for Airtable
- `AIRTABLE_BASE_ID`: Your Airtable base ID
- `N8N_ENCRYPTION_KEY`: Encryption key for n8n credentials

## Workflow Architecture

```
Webhook Input → Request Validation → fal.ai Image Generation → Image Processing
    → Printify Product Creation → Publish to Shopify → Airtable Update → Response
```

## Security Considerations

- All API keys are stored securely as environment variables
- The webhook endpoint is protected with API key authentication
- The n8n instance can be further secured with basic authentication

## Maintenance

- Regularly back up your workflow using the n8n export feature
- Monitor workflow executions for errors
- Update API credentials as needed

## Support

If you encounter any issues with the workflow, please check the n8n logs for error messages and refer to the troubleshooting section in the [Workflow Documentation](./WORKFLOW.md).
