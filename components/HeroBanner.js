/**
 * HeroBanner Component
 * 
 * A reusable component for displaying hero banners on collection pages.
 * Fetches banner images from the Airtable image workspace via the API.
 */

import { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';

export default function HeroBanner({ collection, title, subtitle }) {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip API call if no collection is provided
    if (!collection) {
      setLoading(false);
      return;
    }

    async function fetchHeroBanner() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/airtable/hero-banner?collection=${encodeURIComponent(collection)}`);
        
        if (!response.ok) {
          // If the response is not OK, try to parse the error message
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to fetch hero banner: ${response.status}`);
        }

        const data = await response.json();
        setBanner(data);
      } catch (err) {
        console.error('Error fetching hero banner:', err);
        setError(err.message || 'Failed to load hero banner');
      } finally {
        setLoading(false);
      }
    }

    fetchHeroBanner();
  }, [collection]);

  // If loading, show a skeleton loader
  if (loading) {
    return (
      <div className={styles.heroBannerSkeleton}>
        <div className={styles.contentSkeleton}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.subtitleSkeleton}></div>
        </div>
      </div>
    );
  }

  // If error, show a fallback banner with the error message
  if (error) {
    return (
      <div className={styles.heroBannerFallback}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title || collection}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    );
  }

  // If no banner found but no error (e.g., API returned 404), show a fallback banner
  if (!banner) {
    return (
      <div className={styles.heroBannerFallback}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title || collection}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    );
  }

  // Render the hero banner with the fetched image
  return (
    <div 
      className={styles.heroBanner}
      style={{ backgroundImage: `url(${banner.imageUrl})` }}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{title || collection}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}
