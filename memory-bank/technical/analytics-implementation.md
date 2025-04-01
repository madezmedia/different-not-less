# Analytics Implementation for Different Not Less

## Overview

This document outlines the analytics implementation strategy for Different Not Less Apparel. A comprehensive analytics setup is essential for tracking user behavior, measuring marketing effectiveness, optimizing conversion rates, and making data-driven business decisions.

## Google Analytics 4 Setup

### Account Configuration

1. **Create Google Analytics 4 Property**
   - Access Google Analytics: https://analytics.google.com/
   - Create a new property: "Different Not Less Apparel"
   - Select "Web" as the platform
   - Enter website URL: https://difnotless.com
   - Select industry category: "Shopping"
   - Select reporting time zone: "Eastern Time"

2. **Data Stream Setup**
   - Create a web data stream for difnotless.com
   - Enable enhanced measurement features:
     - Page views
     - Scrolls
     - Outbound clicks
     - Site search
     - Video engagement
     - File downloads

3. **User Management**
   - Add team members with appropriate access levels:
     - Admin: Full control (limited to key stakeholders)
     - Editor: Can edit but not manage users
     - Analyst: Can create reports and annotations
     - Viewer: Can view reports only

### Tracking Code Implementation

1. **Google Tag Manager Integration (Recommended)**
   - Create a Google Tag Manager account
   - Add the GTM container code to the site
   - Deploy GA4 through GTM

   ```javascript
   // pages/_document.js
   import Document, { Html, Head, Main, NextScript } from 'next/document';

   class MyDocument extends Document {
     render() {
       return (
         <Html>
           <Head>
             {/* Google Tag Manager */}
             <script dangerouslySetInnerHTML={{
               __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','GTM-XXXXXXX');`
             }} />
           </Head>
           <body>
             {/* Google Tag Manager (noscript) */}
             <noscript dangerouslySetInnerHTML={{
               __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
               height="0" width="0" style="display:none;visibility:hidden"></iframe>`
             }} />
             <Main />
             <NextScript />
           </body>
         </Html>
       );
     }
   }

   export default MyDocument;
   ```

2. **Direct GA4 Implementation (Alternative)**
   - Add the GA4 tracking code directly to the site

   ```javascript
   // pages/_document.js
   import Document, { Html, Head, Main, NextScript } from 'next/document';

   class MyDocument extends Document {
     render() {
       return (
         <Html>
           <Head>
             {/* Google Analytics */}
             <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
             <script dangerouslySetInnerHTML={{
               __html: `
                 window.dataLayer = window.dataLayer || [];
                 function gtag(){dataLayer.push(arguments);}
                 gtag('js', new Date());
                 gtag('config', 'G-XXXXXXXXXX');
               `
             }} />
           </Head>
           <body>
             <Main />
             <NextScript />
           </body>
         </Html>
       );
     }
   }

   export default MyDocument;
   ```

3. **Next.js Integration with Route Changes**
   - Track page views on route changes

   ```javascript
   // lib/gtag.js
   export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

   // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
   export const pageview = (url) => {
     window.gtag('config', GA_MEASUREMENT_ID, {
       page_path: url,
     });
   };

   // https://developers.google.com/analytics/devguides/collection/gtagjs/events
   export const event = ({ action, category, label, value }) => {
     window.gtag('event', action, {
       event_category: category,
       event_label: label,
       value: value,
     });
   };
   ```

   ```javascript
   // pages/_app.js
   import { useEffect } from 'react';
   import { useRouter } from 'next/router';
   import * as gtag from '../lib/gtag';

   function MyApp({ Component, pageProps }) {
     const router = useRouter();
     
     useEffect(() => {
       const handleRouteChange = (url) => {
         gtag.pageview(url);
       };
       
       router.events.on('routeChangeComplete', handleRouteChange);
       return () => {
         router.events.off('routeChangeComplete', handleRouteChange);
       };
     }, [router.events]);
     
     return <Component {...pageProps} />;
   }

   export default MyApp;
   ```

## E-commerce Tracking

### Enhanced E-commerce Implementation

1. **Product Impressions**
   - Track when products are viewed in lists

   ```javascript
   // components/ProductList.js
   import { useEffect } from 'react';
   import * as gtag from '../lib/gtag';

   export default function ProductList({ products, listName }) {
     useEffect(() => {
       // Track product impressions
       gtag.event({
         action: 'view_item_list',
         category: 'Ecommerce',
         label: listName,
         value: products.length,
         items: products.map((product, index) => ({
           item_id: product.shopifyProductId,
           item_name: product.title,
           item_list_name: listName,
           item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
           index: index + 1,
           price: product.price,
           item_brand: 'Different Not Less',
           item_category: product.collections?.[0]?.title || 'Uncategorized',
         })),
       });
     }, [products, listName]);

     return (
       // Component JSX
     );
   }
   ```

2. **Product Detail Views**
   - Track when a product detail page is viewed

   ```javascript
   // pages/products/[slug].js
   import { useEffect } from 'react';
   import * as gtag from '../../lib/gtag';

   export default function ProductPage({ product }) {
     useEffect(() => {
       // Track product view
       gtag.event({
         action: 'view_item',
         category: 'Ecommerce',
         label: product.title,
         value: parseFloat(product.price),
         items: [{
           item_id: product.shopifyProductId,
           item_name: product.title,
           price: product.price,
           item_brand: 'Different Not Less',
           item_category: product.collections?.[0]?.title || 'Uncategorized',
           item_variant: product.selectedVariant?.title || 'Default',
         }],
       });
     }, [product]);

     return (
       // Component JSX
     );
   }
   ```

3. **Add to Cart Events**
   - Track when products are added to cart

   ```javascript
   // components/AddToCartButton.js
   import * as gtag from '../lib/gtag';

   export default function AddToCartButton({ product, variant, quantity }) {
     const handleAddToCart = () => {
       // Add to cart logic...
       
       // Track add to cart event
       gtag.event({
         action: 'add_to_cart',
         category: 'Ecommerce',
         label: product.title,
         value: parseFloat(variant.price) * quantity,
         items: [{
           item_id: product.shopifyProductId,
           item_name: product.title,
           price: variant.price,
           item_brand: 'Different Not Less',
           item_category: product.collections?.[0]?.title || 'Uncategorized',
           item_variant: variant.title,
           quantity: quantity
         }],
       });
     };

     return (
       <button onClick={handleAddToCart}>Add to Cart</button>
     );
   }
   ```

4. **Checkout Events**
   - Track checkout steps

   ```javascript
   // components/Checkout.js
   import * as gtag from '../lib/gtag';

   export function beginCheckout(cart) {
     gtag.event({
       action: 'begin_checkout',
       category: 'Ecommerce',
       label: 'Checkout Started',
       value: cart.totalPrice,
       items: cart.items.map(item => ({
         item_id: item.product.shopifyProductId,
         item_name: item.product.title,
         price: item.variant.price,
         item_brand: 'Different Not Less',
         item_category: item.product.collections?.[0]?.title || 'Uncategorized',
         item_variant: item.variant.title,
         quantity: item.quantity
       })),
     });
   }

   export function trackCheckoutStep(step, cart) {
     gtag.event({
       action: 'checkout_progress',
       category: 'Ecommerce',
       label: `Checkout Step ${step}`,
       value: cart.totalPrice,
       checkout_step: step,
       items: cart.items.map(item => ({
         item_id: item.product.shopifyProductId,
         item_name: item.product.title,
         price: item.variant.price,
         item_brand: 'Different Not Less',
         item_category: item.product.collections?.[0]?.title || 'Uncategorized',
         item_variant: item.variant.title,
         quantity: item.quantity
       })),
     });
   }
   ```

5. **Purchase Events**
   - Track completed purchases

   ```javascript
   // pages/checkout/success.js
   import { useEffect } from 'react';
   import * as gtag from '../../lib/gtag';

   export default function CheckoutSuccess({ order }) {
     useEffect(() => {
       // Track purchase event
       gtag.event({
         action: 'purchase',
         category: 'Ecommerce',
         label: `Order ${order.id}`,
         value: order.totalPrice,
         transaction_id: order.id,
         affiliation: 'Different Not Less Online Store',
         shipping: order.shippingPrice,
         tax: order.taxAmount,
         currency: 'USD',
         items: order.lineItems.map(item => ({
           item_id: item.product.shopifyProductId,
           item_name: item.product.title,
           price: item.variant.price,
           item_brand: 'Different Not Less',
           item_category: item.product.collections?.[0]?.title || 'Uncategorized',
           item_variant: item.variant.title,
           quantity: item.quantity
         })),
       });
     }, [order]);

     return (
       // Component JSX
     );
   }
   ```

### Shopify Integration

1. **Shopify Analytics Connection**
   - Connect GA4 to Shopify store
   - Add GA4 measurement ID to Shopify admin
   - Enable enhanced e-commerce in Shopify settings

2. **Cross-Domain Tracking**
   - Set up cross-domain tracking between difnotless.com and checkout.shopify.com

   ```javascript
   // lib/gtag.js
   export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

   export const pageview = (url) => {
     window.gtag('config', GA_MEASUREMENT_ID, {
       page_path: url,
       linker: {
         domains: ['difnotless.com', 'checkout.shopify.com']
       }
     });
   };
   ```

## Custom Event Tracking

### User Interaction Events

1. **Product Filtering**
   ```javascript
   // Track when users filter products
   gtag.event({
     action: 'filter_products',
     category: 'User Interaction',
     label: filterType, // e.g., 'size', 'color', 'price'
     value: filterValue
   });
   ```

2. **Product Sorting**
   ```javascript
   // Track when users sort products
   gtag.event({
     action: 'sort_products',
     category: 'User Interaction',
     label: sortType, // e.g., 'price_high_low', 'newest'
   });
   ```

3. **Product Zoom**
   ```javascript
   // Track when users zoom on product images
   gtag.event({
     action: 'zoom_product_image',
     category: 'User Interaction',
     label: product.title,
     value: imageIndex
   });
   ```

4. **Size Guide Views**
   ```javascript
   // Track when users view the size guide
   gtag.event({
     action: 'view_size_guide',
     category: 'User Interaction',
     label: product.title
   });
   ```

### Sensory Features Interaction

1. **Sensory Feature Clicks**
   ```javascript
   // Track when users click on sensory features
   gtag.event({
     action: 'click_sensory_feature',
     category: 'Sensory Features',
     label: featureName, // e.g., 'Tagless', 'Soft Fabric'
     value: product.shopifyProductId
   });
   ```

2. **Sensory Filter Usage**
   ```javascript
   // Track when users filter by sensory features
   gtag.event({
     action: 'filter_by_sensory',
     category: 'Sensory Features',
     label: featureCategory, // e.g., 'Texture', 'Sound'
     value: featureName
   });
   ```

### Marketing Campaign Tracking

1. **UTM Parameter Handling**
   ```javascript
   // pages/_app.js
   import { useEffect } from 'react';
   import { useRouter } from 'next/router';

   function MyApp({ Component, pageProps }) {
     const router = useRouter();
     
     useEffect(() => {
       // Store UTM parameters in localStorage
       if (router.query.utm_source) {
         const utmParams = {
           utm_source: router.query.utm_source,
           utm_medium: router.query.utm_medium,
           utm_campaign: router.query.utm_campaign,
           utm_content: router.query.utm_content,
           utm_term: router.query.utm_term
         };
         
         localStorage.setItem('utm_params', JSON.stringify(utmParams));
       }
     }, [router.query]);
     
     return <Component {...pageProps} />;
   }
   ```

2. **Coupon Code Usage**
   ```javascript
   // Track when users apply coupon codes
   gtag.event({
     action: 'apply_coupon',
     category: 'Checkout',
     label: couponCode,
     value: discountAmount
   });
   ```

## Conversion Goals & Funnels

### Goal Configuration

1. **Primary Conversion Goals**
   - Purchase completion
   - Email newsletter signup
   - Account creation
   - Add to cart

2. **Secondary Goals**
   - Product detail views
   - Collection page views
   - Size guide views
   - Contact form submissions

### Funnel Setup

1. **Main Purchase Funnel**
   - Step 1: Product List View
   - Step 2: Product Detail View
   - Step 3: Add to Cart
   - Step 4: Begin Checkout
   - Step 5: Shipping Information
   - Step 6: Payment Information
   - Step 7: Purchase Completion

2. **Account Creation Funnel**
   - Step 1: Visit Registration Page
   - Step 2: Begin Registration
   - Step 3: Complete Registration
   - Step 4: First Login

3. **Newsletter Signup Funnel**
   - Step 1: View Signup Form
   - Step 2: Begin Form Completion
   - Step 3: Submit Form
   - Step 4: Confirmation

## Custom Dimensions & Metrics

### Custom Dimensions

1. **User Type**
   - New vs. Returning
   - Registered vs. Guest

2. **Product Attributes**
   - Sensory Features
   - Collection Type
   - Price Range

3. **User Preferences**
   - Size Preferences
   - Color Preferences
   - Style Preferences

### Custom Metrics

1. **Engagement Depth**
   - Products Viewed Per Session
   - Collections Viewed Per Session
   - Time Spent on Product Pages

2. **Cart Metrics**
   - Cart Abandonment Rate
   - Average Items Per Cart
   - Cart Value Distribution

## Dashboard & Reporting

### Standard Dashboards

1. **Executive Overview**
   - Key performance indicators
   - Revenue trends
   - Conversion rates
   - Traffic sources

2. **Product Performance**
   - Top-selling products
   - Product view-to-purchase ratio
   - Collection performance
   - Sensory feature impact

3. **Marketing Effectiveness**
   - Campaign performance
   - Channel attribution
   - Referral sources
   - Social media impact

4. **User Behavior**
   - User flow visualization
   - Funnel completion rates
   - Drop-off points
   - Session duration and depth

### Custom Reports

1. **Sensory Feature Impact Report**
   - Correlation between sensory features and purchases
   - Sensory feature filter usage
   - Sensory feature click-through rates

2. **Collection Performance Report**
   - Collection view-to-purchase ratio
   - Collection revenue contribution
   - Collection traffic sources

3. **User Segment Analysis**
   - Behavior patterns by user segment
   - Conversion rates by segment
   - Average order value by segment

## Data Privacy & Compliance

### GDPR Compliance

1. **Cookie Consent Banner**
   ```javascript
   // components/CookieConsent.js
   import { useState, useEffect } from 'react';
   import * as gtag from '../lib/gtag';

   export default function CookieConsent() {
     const [consent, setConsent] = useState(null);
     
     useEffect(() => {
       // Check for existing consent
       const storedConsent = localStorage.getItem('cookie_consent');
       if (storedConsent) {
         setConsent(storedConsent === 'true');
       }
     }, []);
     
     const handleAccept = () => {
       localStorage.setItem('cookie_consent', 'true');
       setConsent(true);
       
       // Enable analytics
       window['ga-disable-' + gtag.GA_MEASUREMENT_ID] = false;
     };
     
     const handleDecline = () => {
       localStorage.setItem('cookie_consent', 'false');
       setConsent(false);
       
       // Disable analytics
       window['ga-disable-' + gtag.GA_MEASUREMENT_ID] = true;
     };
     
     if (consent !== null) return null;
     
     return (
       <div className="cookie-banner">
         <p>We use cookies to improve your experience. Do you accept?</p>
         <button onClick={handleAccept}>Accept</button>
         <button onClick={handleDecline}>Decline</button>
       </div>
     );
   }
   ```

2. **Data Retention Settings**
   - Configure GA4 data retention period (14 months)
   - Implement data deletion requests handling

### CCPA Compliance

1. **Do Not Sell My Information Link**
   - Add to footer navigation
   - Implement opt-out functionality

2. **Privacy Policy Updates**
   - Update privacy policy with CCPA-specific language
   - Document data collection practices

## Implementation Timeline

### Phase 1: Basic Setup (Week 1)
- Install GA4 tracking code
- Configure basic e-commerce tracking
- Set up cross-domain tracking with Shopify

### Phase 2: Enhanced Tracking (Week 2)
- Implement custom events
- Configure conversion goals
- Set up custom dimensions and metrics

### Phase 3: Reporting & Optimization (Week 3)
- Create custom dashboards
- Set up automated reports
- Configure alerts for key metrics

### Phase 4: Compliance & Fine-tuning (Week 4)
- Implement privacy controls
- Test and validate all tracking
- Document analytics implementation

## Maintenance & Governance

### Regular Audits
- Monthly tracking code audit
- Quarterly goal and event review
- Annual analytics strategy review

### Team Responsibilities
- **Marketing Team**: Define KPIs and reporting needs
- **Development Team**: Implement and maintain tracking code
- **Analytics Owner**: Monitor data quality and provide insights

### Documentation
- Maintain up-to-date event tracking guide
- Document all custom dimensions and metrics
- Keep implementation changelog

## Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 E-commerce Implementation Guide](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Next.js Analytics Integration](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
