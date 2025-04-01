# Different Not Less Apparel - n8n Automation Reference

## Project Overview

This document provides technical specifications for the n8n workflow that automates the t-shirt design generation and product creation process for Different Not Less Apparel.

## Workflow Components

### 1. Webhook Endpoint
- Receives design requests with product details
- Validates required fields (prompt, productType, title)
- Handles optional fields with sensible defaults

### 2. AI Image Generation
- Uses fal.ai API to generate t-shirt designs
- Creates transparent PNG images (4500x5400px)
- Translates text prompts into AAC-friendly designs

### 3. Printify Integration
- Creates new products in Printify with generated designs
- Supports multiple product types (t-shirts, hoodies, etc.)
- Maps variants with appropriate sizes and colors
- Sets pricing based on product type and size

### 4. Shopify Sync
- Publishes products from Printify to Shopify
- Maintains consistent product information
- Enables immediate visibility on e-commerce site

### 5. Airtable Inventory Tracking
- Updates inventory records in Airtable
- Maintains a central product database
- Tracks product IDs across platforms

## Technical Requirements

### Credentials
- fal.ai API key
- Printify API key and shop ID
- Shopify access (via Printify)
- Airtable API key and base ID

### Product Types
- T-shirts (blueprint_id: 5)
- Hoodies (blueprint_id: 9)
- Sweatshirts (blueprint_id: 14)
- Long Sleeve Shirts (blueprint_id: 7)
- Tank Tops (blueprint_id: 13)

### API Integrations
- fal.ai workflow API for image generation
- Printify REST API for product creation
- Airtable API for inventory management

## Usage

1. Send a POST request to the webhook with design details
2. Receive a response with product creation confirmation
3. Access the product in Printify for any final adjustments
4. View the published product in Shopify

## Example Request Payload

```json
{
  "prompt": "Your Words Matter t-shirt with AAC device layout in blue and gold colors",
  "productType": "t-shirt",
  "title": "Your Words Matter - AAC Device",
  "description": "Celebrate all forms of communication with our signature AAC-inspired design.",
  "collections": ["Your Words Matter", "SLP Collection"],
  "tags": ["AAC", "speech therapy", "communication", "SLP"],
  "variants": [
    { "color": "white", "sizes": ["S", "M", "L", "XL", "2XL"] },
    { "color": "light blue", "sizes": ["S", "M", "L", "XL"] }
  ]
}
```

## Example Response

```json
{
  "success": true,
  "message": "Product successfully created and synced",
  "product": {
    "title": "Your Words Matter - AAC Device",
    "printifyProductId": "123456789",
    "printifyEditUrl": "https://printify.com/app/editor/123456789",
    "shopifyProductId": "987654321",
    "shopifyUrl": "https://differentnotless.com/products/your-words-matter-aac-device",
    "designImageUrl": "https://cdn.fal.ai/outputs/123456.png"
  }
}
```

This system is essential for streamlining the creation of AAC and autism acceptance apparel products, allowing Different Not Less Apparel to efficiently expand their product offerings while maintaining quality and accuracy in design representation.
