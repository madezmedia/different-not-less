import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <Image 
              src="/difnotless.png" 
              alt="Different Not Less Apparel" 
              width={160} 
              height={45} 
              className={styles.footerLogo}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <p className={styles.description}>
            Sensory-friendly apparel celebrating AAC, autism acceptance, and inclusive communication.
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Shop</h3>
          <ul className={styles.links}>
            <li>
              <Link href="/collections/your-words-matter" className={styles.link}>
                Your Words Matter
              </Link>
            </li>
            <li>
              <Link href="/collections/different-not-less" className={styles.link}>
                Different Not Less
              </Link>
            </li>
            <li>
              <Link href="/collections/slp-professional" className={styles.link}>
                SLP Professional
              </Link>
            </li>
            <li>
              <Link href="/collections/educator" className={styles.link}>
                Educator
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Information</h3>
          <ul className={styles.links}>
            <li>
              <Link href="/about" className={styles.link}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/sensory-features" className={styles.link}>
                Sensory Features
              </Link>
            </li>
            <li>
              <Link href="/shipping" className={styles.link}>
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {currentYear} Different Not Less Apparel. All rights reserved.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className={styles.legalLink}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
