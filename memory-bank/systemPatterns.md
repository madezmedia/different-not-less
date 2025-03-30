# System Patterns - Different Not Less Apparel

## Architectural Patterns

### Headless Commerce Architecture

Different Not Less Apparel implements a headless commerce architecture, separating the frontend presentation layer from the backend business logic. This pattern provides:

- **Flexibility:** Ability to update the frontend without affecting backend systems
- **Performance:** Optimized loading speeds and user experience
- **Scalability:** Independent scaling of frontend and backend components
- **Multi-channel readiness:** Future-proofing for expansion to mobile apps or marketplaces

### Content-as-a-Service (CaaS)

Utilizing Sanity CMS as a content layer that:
- Serves structured content through APIs
- Maintains separation of content and presentation
- Enables consistent content delivery across channels
- Supports complex content relationships

### Microservices Communication

System components communicate through well-defined APIs:
- Shopify handles core e-commerce functions
- Sanity manages content and product information
- Airtable manages detailed inventory tracking
- Next.js frontend consumes these services through APIs

## Data Models

### Product Data Model

```
Product
├── Basic Information
│   ├── title: String
│   ├── slug: String
│   ├── shopifyProductId: String
│   ├── airtableRecordId: String
│   └── description: RichText
├── Media
│   ├── mainImage: Image
│   └── images: Array<Image>
├── Categorization
│   ├── collections: Array<Reference>
│   ├── tags: Array<String>
│   └── targetAudience: Array<String>
├── Design Information
│   ├── designStyle: String
│   ├── designElements: Array<String>
│   └── taglineMessage: String
├── Technical Details
│   ├── material: String
│   ├── sensoryFeatures: Text
│   └── careInstructions: Text
└── Visibility
    ├── isNewArrival: Boolean
    └── isFeatured: Boolean
```

### Inventory Data Model

```
Inventory
├── Product Reference
│   ├── product: Reference
│   └── variantId: String
├── Variant Information
│   ├── size: String
│   └── color: String
├── Stock Information
│   ├── inventoryCount: Number
│   ├── reorderThreshold: Number
│   └── reorderStatus: Formula
└── Tracking
    └── lastInventoryUpdate: Date
```

### Customer Data Model

```
Customer
├── Basic Information
│   ├── name: String
│   ├── email: Email
│   ├── phone: Phone
│   └── shopifyCustomerId: String
├── Order Information
│   ├── orders: Array<Reference>
│   ├── totalOrders: Count
│   └── totalSpent: Currency
├── Segmentation
│   ├── firstOrderDate: Date
│   ├── lastOrderDate: Date
│   ├── customerType: Enum (SLP, Teacher, Parent, AAC User, Other)
│   └── averageOrderValue: Formula
└── Preferences
    └── marketingPreferences: Array<Enum>
```

### Order Data Model

```
Order
├── Reference Information
│   ├── orderNumber: String
│   ├── shopifyOrderId: String
│   ├── customer: Reference
│   └── orderDate: Date
├── Items
│   ├── products: Array<Reference>
│   └── quantities: Array<Number>
├── Financial
│   ├── subtotal: Currency
│   ├── shippingCost: Currency
│   ├── tax: Currency
│   └── total: Currency
└── Status
    ├── paymentStatus: Enum
    ├── fulfillmentStatus: Enum
    └── trackingNumber: String
```

## Design Patterns

### Component-Based Architecture

Frontend follows a component-based architecture using React/Next.js:
- **Atomic Design Principles:** Building from atoms to organisms to templates
- **Component Reusability:** Design system with shared components
- **Component Composition:** Complex UIs built from simple components

### Repository Pattern

Data access is abstracted through repository classes:
- `ShopifyRepository` for e-commerce operations
- `SanityRepository` for content operations
- `AirtableRepository` for inventory operations

### State Management Pattern

React Context API for global state management:
- `CartContext` for shopping cart state
- `UserContext` for user authentication and preferences
- `UIContext` for UI state (modals, navigation, etc.)

### Service Layer Pattern

Business logic is encapsulated in service classes:
- `InventoryService` for inventory management logic
- `OrderService` for order processing logic
- `ProductService` for product filtering and search logic

## Integration Patterns

### Webhook-Based Integration

Custom webhook system for real-time updates between systems:
- Design generation service to Printify production
- Shopify to Airtable for inventory updates
- Order events to customer notification system

### API Gateway Pattern

Next.js API routes serve as an API gateway:
- Authentication and authorization
- Request validation
- Rate limiting
- Response caching
- Service orchestration

### Event-Driven Architecture

System events trigger appropriate actions:
- Order placed → Inventory update + Email notification
- Low inventory → Reorder alert
- Customer signup → Welcome email sequence

## Authentication & Authorization

### JWT-Based Authentication

JSON Web Tokens for secure authentication:
- Short lived access tokens
- Refresh token rotation
- CSRF protection
- Secure, HTTP-only cookies

### Role-Based Authorization

Access control based on user roles:
- `Customer`: Order management, personal account
- `Admin`: Content management, order processing
- `Editor`: Content creation and updates

## Error Handling Pattern

Consistent error handling approach:
- Error boundaries in React components
- Standardized API error responses
- Error logging and monitoring
- User-friendly error messages
- Fallback UI components

## Caching Strategy

Multi-level caching strategy:
- CDN caching for static assets
- Server-side caching for API responses
- Client-side caching for user data
- Redis caching for frequently accessed data

## Deployment Patterns

### CI/CD Pipeline

Automated deployment workflow:
- GitHub Actions for CI/CD
- Automated testing before deployment
- Staging environment validation
- Production deployment with zero downtime

### Feature Flagging

Controlled feature rollout:
- A/B testing capability
- Gradual feature release
- Easy rollback mechanism
- User segment targeting

## SEO Patterns

### Server-Side Rendering (SSR)

Critical pages rendered server-side for SEO:
- Collection pages
- Product detail pages
- Content pages

### Static Site Generation (SSG)

Pre-rendered static pages for content:
- Educational resources
- Blog posts
- Landing pages

### Hybrid Rendering

Combining SSR and SSG appropriately:
- Dynamic data with getServerSideProps()
- Static data with getStaticProps() and revalidation

## Performance Patterns

### Code Splitting

Optimized JavaScript bundles:
- Route-based code splitting
- Component-level code splitting
- Dynamic imports for large components
- Vendor code separation

### Image Optimization

Advanced image optimization strategy:
- Responsive images with srcset
- WebP format with fallbacks
- Lazy loading offscreen images
- Proper size and quality balance

## Accessibility Patterns

### Semantic HTML Structure

Focus on semantic markup:
- Proper heading hierarchy
- ARIA roles and attributes
- Keyboard navigation support
- Focus management

### Progressive Enhancement

Building with accessibility as foundation:
- Core functionality without JavaScript
- Enhanced experience with JavaScript
- Graceful degradation for older browsers

## Content Delivery Patterns

### Content Modeling

Structured content approach in Sanity:
- Content types with defined schemas
- Relationships between content types
- Content validation rules
- Customizable workflows

### Content Localization

Ready for multi-language support:
- Translatable content fields
- Language-specific routes
- Currency and format localization
- Region-specific content

## Last Updated

March 30, 2025
