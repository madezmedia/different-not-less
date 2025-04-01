# Different Not Less Setup Guide

This guide provides instructions for setting up the complete Different Not Less e-commerce platform.

## Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/different-not-less.git
cd different-not-less
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```ini
# Shopify
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN=your-storefront-access-token

# Airtable
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-airtable-base-id

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-03-25
SANITY_API_TOKEN=your-sanity-api-token

# Fal.ai and Make.com
FAL_API_KEY=your-fal-api-key
MAKE_API_KEY=your-make-api-key
```

## Airtable Setup

1. **Create an Airtable base** named "Different Not Less"

2. **Set up Shopify Store Setup table**
   - Create a table named "Shopify Store Setup" with these fields:
     - Task Name (Single line text)
     - Category (Single select: Store Foundation, Store Design, Product Setup, Collection Setup, Content Creation, Integration, Marketing, Legal, Technical)
     - Status (Single select: Not Started, In Progress, Waiting on Dependency, Completed, Blocked)
     - Priority (Single select: High, Medium, Low)
     - Assigned To (Single line text)
     - Due Date (Date)
     - Description (Long text)
     - Dependencies (Long text)
     - Notes (Long text)
     - Completion Date (Date)
     - Launch Phase (Single select: Pre-Launch, Launch Week, Post-Launch)

3. **Set up Business Details table**
   - Create a table named "Business Details" with these fields:
     - Item Name (Single line text)
     - Category (Single select: Legal, Financial, Brand Identity, Accounts, Policies, Contact Information, Shipping, Taxes)
     - Value (Long text)
     - Date Added (Date)
     - Last Updated (Date)
     - Notes (Long text)
     - Document (Attachment)
     - Status (Single select: Not Started, In Progress, Completed, Needs Review, Needs Update)
     - Responsible Party (Single line text)

4. **Populate initial data**
   - Run the setup script to add initial data:
   ```bash
   node scripts/create-shopify-setup-tables.js
   ```
   - Alternatively, import data manually from the provided JSON files

## Shopify Store Setup

1. **Create a Shopify account**
   - Sign up for Shopify at [shopify.com](https://www.shopify.com/)
   - Choose a plan appropriate for headless commerce

2. **Configure store settings**
   - Set up payment gateways (Shopify Payments, PayPal)
   - Configure shipping zones and rates
   - Set up tax collection settings
   - Connect your custom domain

3. **Create collections**
   - Your Words Matter Collection (AAC focus)
   - Different Not Less Collection (Autism acceptance)
   - SLP Professional Collection
   - Educator Collection

4. **Connect to Printify**
   - Create a Printify account
   - Connect Printify to your Shopify store
   - Select product providers and configure settings

## Make.com Automation Setup

1. **Create a Make.com account**

2. **Import workflows**
   - Use the JSON files from the make/ directory
   - Import them as new scenarios in Make.com

3. **Configure connections**
   - Connect to your Airtable base
   - Add OpenAI and Cohere API keys
   - Connect to your Fal.ai account
   - Connect to Printify
   - Add Gmail connection for notifications

4. **Activate the workflows**
   - Test each workflow
   - Set up scheduling if needed
   - Activate for production use

## Next.js Frontend Setup

1. **Configure headless Shopify integration**
   - Make sure your Shopify API credentials are in .env.local
   - Confirm access to products and collections

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Sanity CMS Setup

1. **Set up Sanity studio**
   - Configure schemas
   - Create content types
   - Set up permissions

2. **Connect Sanity to Next.js**
   - Make sure your Sanity credentials are in .env.local
   - Test content fetching

## Deployment

1. **Deploy to Vercel**
   - Connect your GitHub repository
   - Configure environment variables
   - Set up deployment options

2. **Configure custom domain**
   - Add difnotless.com to Vercel
   - Configure DNS settings
   - Set up SSL certificate

## Final Checklist

- [ ] Verify all API connections
- [ ] Test end-to-end product creation workflow
- [ ] Test order processing
- [ ] Verify inventory synchronization
- [ ] Test checkout process
- [ ] Test mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Test all automated workflows