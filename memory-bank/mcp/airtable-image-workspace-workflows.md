# Airtable Image Workspace MCP Workflows

This document outlines the workflows and MCP integrations for the Airtable image workspace used to manage website and social media assets for Different Not Less.

## Table of Contents

1. [Overview](#overview)
2. [Airtable Base Structure](#airtable-base-structure)
3. [MCP Integration](#mcp-integration)
4. [Workflows](#workflows)
5. [n8n Automation](#n8n-automation)
6. [Website Integration](#website-integration)
7. [Best Practices](#best-practices)

## Overview

The Airtable image workspace serves as a central repository for all visual assets used across the Different Not Less website and social media channels. It provides:

- Structured storage for images with metadata
- Workflow management from creation to publication
- Integration with AI image generation tools
- Automated processes for image creation and management
- Website integration for dynamic content display

## Airtable Base Structure

The image workspace consists of four interconnected tables:

1. **Website Images** (`tblvIGksraXr9MHlJ`) - Primary table for all website images
2. **Image Generation Logs** (`tblZwp6nGsl31jupX`) - Tracks image generation attempts and results
3. **Social Media Content** (`tbln1iT0EwPvGgUOJ`) - Manages social media posts that use images
4. **Image Templates** (`tblbh48d8zvz0TUTQ`) - Stores reusable templates for different image types

For detailed schema information, see [airtable-image-workspace-schema.js](/memory-bank/technical/airtable-image-workspace-schema.js).

## MCP Integration

The Airtable MCP server provides the following tools for interacting with the image workspace:

### Core MCP Tools

| Tool | Description | Common Usage |
|------|-------------|--------------|
| `list_records` | List records from a table | Get all images of a specific type |
| `search_records` | Search for records containing specific text | Find images by collection or tag |
| `create_record` | Create a new record in a table | Add a new image or template |
| `update_records` | Update existing records | Change image status or metadata |
| `delete_records` | Delete records from a table | Remove unused images |

### Example MCP Commands

#### Creating a Hero Banner

```javascript
const params = {
  baseId: "applwPKN2KZFZ9JfW",
  tableId: "tblvIGksraXr9MHlJ",
  fields: {
    "Image Name": "Hero-YourWordsMatter-MainBanner-1200x400",
    "Image Type": "Hero Banner",
    "Image Dimensions": "1200x400",
    "Status": "Draft",
    "Collection Association": ["Your Words Matter"],
    "Usage Location": ["Homepage", "Collection Page"],
    "Generation Prompt": "A vibrant, inclusive classroom setting with diverse children using AAC devices to communicate...",
    "Alt Text": "Diverse children in an inclusive classroom using AAC devices to communicate with each other and teachers...",
    "Tags": ["AAC", "Inclusive", "Communication"]
  }
};

// Execute MCP command
const result = await executeMcpCommand("create_record", params);
```

#### Searching for Images by Collection

```javascript
const params = {
  baseId: "applwPKN2KZFZ9JfW",
  tableId: "tblvIGksraXr9MHlJ",
  searchTerm: "Your Words Matter",
  fieldIds: ["Collection Association"]
};

// Execute MCP command
const result = await executeMcpCommand("search_records", params);
```

#### Updating Image Status

```javascript
const params = {
  baseId: "applwPKN2KZFZ9JfW",
  tableId: "tblvIGksraXr9MHlJ",
  records: [
    {
      id: "rec123456789",
      fields: {
        "Status": "In Use"
      }
    }
  ]
};

// Execute MCP command
const result = await executeMcpCommand("update_records", params);
```

## Workflows

### Image Creation Workflow

1. **Request Phase**
   - Create a new record in the Website Images table with status "Draft"
   - Specify image type, dimensions, collection association, and generation prompt
   - Set tags and alt text for accessibility and searchability

2. **Generation Phase**
   - n8n workflow detects new "Draft" status images
   - Extracts generation parameters and prompt
   - Calls fal.ai API to generate the image
   - Updates the image record with the generated image
   - Creates a log entry in the Image Generation Logs table
   - Changes status to "In Review"

3. **Review Phase**
   - Team reviews the generated image
   - Updates status to "Approved" if acceptable
   - Or reverts to "Draft" with updated prompt for regeneration

4. **Publication Phase**
   - Approved images are set to "In Use" when published on the website
   - Website components automatically fetch and display the images

### Social Media Workflow

1. **Content Planning**
   - Create a new record in the Social Media Content table
   - Link to existing images or request new ones
   - Draft caption and hashtags

2. **Scheduling**
   - Set scheduled date for publication
   - Update status to "Scheduled"

3. **Publication**
   - n8n workflow publishes content on scheduled date
   - Updates status to "Published"

4. **Analytics**
   - Performance metrics are updated periodically

## n8n Automation

The n8n automation server provides several workflows for the image workspace:

### Image Generation Workflow

This workflow automates the image generation process:

1. **Trigger**: New or updated "Draft" status image in Website Images table
2. **Action**: Extract generation parameters
3. **Action**: Call fal.ai API to generate image
4. **Action**: Update image record with generated image
5. **Action**: Create log entry
6. **Action**: Send notification email

See [image-generation-workflow.json](/n8n/image-generation-workflow.json) for the complete workflow definition.

### Social Media Publishing Workflow

This workflow automates social media posting:

1. **Trigger**: Scheduled date reached for "Scheduled" status content
2. **Action**: Fetch linked images
3. **Action**: Post to appropriate social platforms
4. **Action**: Update status to "Published"
5. **Action**: Send confirmation email

## Website Integration

The website integrates with the Airtable image workspace through:

### API Endpoints

- `/api/airtable/hero-banner` - Fetches hero banners for collection pages
- `/api/airtable/product-images` - Fetches product images
- `/api/airtable/social-preview` - Fetches social media preview images

### React Components

- `HeroBanner` - Displays hero banners with loading and fallback states
- `ProductGallery` - Displays product images
- `SocialFeed` - Displays recent social media posts

### Example Usage

```jsx
// Collection page
import HeroBanner from '../components/HeroBanner';

export default function CollectionPage({ collection }) {
  return (
    <div>
      <HeroBanner 
        collection={collection.name} 
        title={collection.title} 
        subtitle={collection.description} 
      />
      {/* Rest of collection page */}
    </div>
  );
}
```

## Best Practices

### Naming Conventions

- Image names should follow the format: `[Type]-[Collection]-[Purpose]-[Dimensions]`
- Example: `Hero-YourWordsMatter-MainBanner-1200x400`

### Image Dimensions

Standard dimensions for different image types:

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| Hero Banner | 1200x400 | 3:1 |
| Product Image | 800x1000 | 4:5 |
| Collection Thumbnail | 600x600 | 1:1 |
| Instagram Post | 1080x1080 | 1:1 |
| Facebook Cover | 1640x924 | 16:9 |
| Email Header | 600x200 | 3:1 |

### Prompt Guidelines

- Be specific about the scene, subjects, and style
- Include references to brand colors and aesthetic
- Specify any accessibility considerations
- Include keywords related to the collection theme

### Status Management

- Only images with "In Use" status should be displayed on the website
- Archive unused images rather than deleting them
- Keep a record of all generation attempts, even failed ones

### Performance Considerations

- Use appropriate image dimensions for each context
- Consider lazy loading for image-heavy pages
- Implement responsive images with srcset for different device sizes
