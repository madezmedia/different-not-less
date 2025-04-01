/**
 * Collection Page Template
 * 
 * This page displays products from a specific collection with a hero banner
 * fetched from the Airtable image workspace.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import HeroBanner from '../../components/HeroBanner';
import styles from '../../styles/Collection.module.css';

// Collection metadata for titles and descriptions
const COLLECTIONS = {
  'your-words-matter': {
    title: 'Your Words Matter',
    subtitle: 'Clothing that celebrates AAC users and the power of communication in all its forms.',
    description: 'Our "Your Words Matter" collection features designs that celebrate AAC users and the importance of communication in all its forms. Each piece is designed with sensory-friendly features and inclusive messaging.'
  },
  'sensory-friendly': {
    title: 'Sensory Friendly',
    subtitle: 'Comfortable, tag-free clothing designed with sensory sensitivities in mind.',
    description: 'Our Sensory Friendly collection features soft, comfortable clothing with no tags, flat seams, and designs that accommodate sensory sensitivities while still looking great.'
  },
  'neurodiversity': {
    title: 'Neurodiversity',
    subtitle: 'Celebrate the beautiful diversity of human minds with our neurodiversity collection.',
    description: 'Our Neurodiversity collection celebrates the beautiful diversity of human minds with designs that promote acceptance, understanding, and pride.'
  }
};

export default function CollectionPage() {
  const router = useRouter();
  const { collection } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get collection metadata or use defaults
  const collectionData = collection && COLLECTIONS[collection] 
    ? COLLECTIONS[collection] 
    : { 
        title: collection ? collection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '',
        subtitle: '',
        description: ''
      };

  // Fetch products for this collection
  useEffect(() => {
    const fetchProducts = async () => {
      if (!collection) return;
      
      try {
        setLoading(true);
        // In a real implementation, this would fetch from Shopify or another product source
        // For now, we'll simulate a product fetch with a timeout
        setTimeout(() => {
          // Simulated product data
          const mockProducts = Array(8).fill().map((_, i) => ({
            id: `product-${i}`,
            title: `${collectionData.title} Product ${i + 1}`,
            price: '$29.99',
            image: 'https://via.placeholder.com/300x400',
            handle: `${collection}-product-${i + 1}`
          }));
          
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collection, collectionData.title]);

  // If the page is still loading the collection parameter
  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{collectionData.title} | Different Not Less</title>
        <meta name="description" content={collectionData.description || `Shop our ${collectionData.title} collection.`} />
      </Head>

      {/* Hero Banner */}
      <HeroBanner 
        collection={collectionData.title}
        title={collectionData.title}
        subtitle={collectionData.subtitle}
      />

      {/* Collection Description */}
      {collectionData.description && (
        <div className={styles.collectionDescription}>
          <p>{collectionData.description}</p>
        </div>
      )}

      {/* Products Grid */}
      <div className={styles.productsContainer}>
        <h2 className={styles.productsHeading}>Products</h2>
        
        {loading ? (
          <div className={styles.productsGrid}>
            {Array(4).fill().map((_, i) => (
              <div key={i} className={styles.productCardSkeleton}>
                <div className={styles.productImageSkeleton}></div>
                <div className={styles.productTitleSkeleton}></div>
                <div className={styles.productPriceSkeleton}></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={styles.productsGrid}>
            {products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className={styles.productImage}
                  />
                </div>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>{product.price}</p>
                <button className={styles.viewProductButton}>
                  View Product
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>
            <p>No products found in this collection.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
