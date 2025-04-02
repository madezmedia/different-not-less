# Different Not Less - Sanity Studio

This is the Sanity Studio for the Different Not Less project.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

4. Deploy to Sanity's hosted platform:
   ```
   npm run deploy
   ```

## Content Structure

The Sanity Studio is configured with the following content types:

- **Products**: Apparel products with details like materials, sensory features, and design information
- **Collections**: Product collections/categories
- **Blog Posts**: Educational and informational blog content
- **Educational Resources**: Guides, infographics, and tools
- **AAC Resources**: Information specific to Alternative and Augmentative Communication
- **Material Information**: Detailed data about product materials
- **Sensory Features**: Documented sensory characteristics of products
- **Author Profiles**: Information about content contributors

## Environment Variables

The Sanity Studio uses the following environment variables that should be set in your project:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN` (for content management operations)

## Documentation

For more information about Sanity, check out the following resources:

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Content Lake API Reference](https://www.sanity.io/docs/api-versioning)
- [Schema Types](https://www.sanity.io/docs/schema-types)