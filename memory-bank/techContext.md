# Technical Context - Different Not Less Apparel

## Technology Stack Overview

Different Not Less Apparel utilizes a headless commerce architecture, separating the frontend presentation layer from the backend business logic to create a flexible, high-performance e-commerce platform.

### Core Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Backend E-commerce | Shopify | Order processing, inventory, payments |
| Frontend Framework | Next.js | Performance-optimized storefront |
| Content Management | Sanity CMS | Product/content management |
| Inventory Management | Airtable | Detailed inventory tracking |
| Analytics | Google Analytics 4 | User behavior tracking |
| Email Marketing | [TBD] | Customer communications |
| Hosting | Vercel | Frontend hosting and deployment |
| Domain | difnotless.com | Primary domain (acquired) |

## System Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌───────────────┐
│                 │     │                  │     │               │
│  Next.js        │◄────┤  Shopify API     │◄────┤  Shopify      │
│  Frontend       │     │  Integration     │     │  Backend      │
│                 │     │                  │     │               │
└────────┬────────┘     └──────────────────┘     └───────────────┘
         │                                               ▲
         │                                               │
         ▼                                               │
┌─────────────────┐                             ┌────────┴────────┐
│                 │                             │                  │
│  Sanity CMS     │─────────────────────────────►  Airtable       │
│  Content        │                             │  Inventory      │
│                 │                             │                  │
└─────────────────┘                             └──────────────────┘
```

## Development Environment Setup

### Local Development Requirements

- Node.js (v16+)
- npm or yarn
- Shopify Partner account
- Sanity.io account
- Airtable account
- Vercel account

### Repository Structure

```
different-not-less/
├── .github/            # GitHub Actions workflows
├── .next/              # Next.js build output
├── components/         # React components
│   ├── common/         # Shared components
│   ├── product/        # Product-specific components
│   └── layout/         # Layout components
├── lib/                # Utility functions
│   ├── shopify.js      # Shopify integration
│   ├── sanity.js       # Sanity integration
│   └── airtable.js     # Airtable integration
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── products/       # Product pages
│   ├── collections/    # Collection pages
│   └── [...]           # Other pages
├── public/             # Static assets
├── sanity/             # Sanity studio
├── styles/             # CSS/SCSS files
├── .env.local          # Environment variables
└── package.json        # Dependencies
```

## API Integrations

### Shopify Integration

- **Type:** REST API + GraphQL Storefront API
- **Authentication:** Shopify API key + secret
- **Key Endpoints:**
  - Products
  - Collections
  - Orders
  - Customers
  - Inventory

### Sanity CMS Integration

- **Type:** GraphQL API
- **Authentication:** Project ID + dataset + token
- **Key Features:**
  - Custom product schema
  - Educational content management
  - Media management
  - Collection organization

### Airtable Integration

- **Type:** REST API
- **Authentication:** API key
- **Key Tables:**
  - Products
  - Inventory
  - Orders
  - Customers
  - Marketing Campaigns
  - SEO Keywords

### Email Marketing Integration

- **Platform:** [TBD]
- **Authentication:** API key
- **Key Features:**
  - Segmented email lists
  - Automated workflows
  - Campaign analytics

## Website Components

### Key Frontend Components

1. **Product Display**
   - Product gallery with image zoom
   - Size selection with detailed measurements
   - Sensory features highlights
   - Material information
   - Related products

2. **Cart & Checkout**
   - One-page checkout
   - Real-time inventory checking
   - Shipping calculator
   - Discount code functionality
   - Order summary

3. **User Account**
   - Order history
   - Saved addresses
   - Wishlist functionality
   - Communication preferences

4. **Educational Content Hub**
   - AAC information resources
   - Implementation guides
   - Classroom resources
   - Professional development content

## Mobile Optimization

- Responsive design for all screen sizes
- Progressive Web App (PWA) capabilities
- Mobile-first development approach
- Touch-optimized interface
- Accessible navigation

## Accessibility Implementation

- WCAG 2.1 AA compliance 
- Screen reader compatibility
- Keyboard navigation support
- Color contrast ratios 4.5:1 minimum
- Alternative text for all images
- Form field labels and error states

## Custom Webhook Implementation

Custom webhook solution for design generation process:

```javascript
// server.js - Express server for webhooks
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const crypto = require('crypto');

// Integration between design generation service and Printify
// for automated product creation
```

## Analytics Implementation

- **Google Analytics 4** for core web vitals and user behavior
- **Enhanced E-commerce Tracking** for purchase funnel analysis
- **Custom Events** for user interactions with educational content
- **Audience Segmentation** based on professional roles

## Security Measures

- SSL/TLS encryption for all communications
- PCI DSS compliance for payment processing
- Regular security audits and penetration testing
- Data minimization practices
- Secure authentication and authorization

## Performance Optimization

- Image optimization and lazy loading
- Code splitting and bundle optimization
- Server-side rendering for core pages
- Static generation for content pages
- CDN distribution for assets

## Technical Constraints

- Shopify API rate limits
- Airtable record limits for free tier
- Next.js build time considerations
- Mobile performance optimization
- Inventory sync frequency limitations

## Third-Party Dependencies

- **Shopify Storefront API** for e-commerce functionality
- **Sanity CMS** for content management
- **Airtable** for inventory and order tracking
- **Vercel** for hosting and deployment
- **[TBD] Email Marketing Platform** for customer communications

## Last Updated

March 30, 2025
