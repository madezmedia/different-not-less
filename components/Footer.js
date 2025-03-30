import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Different Not Less</h3>
          <p className={styles.description}>
            Sensory-friendly apparel celebrating AAC, autism acceptance, and inclusive communication.
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Shop</h3>
          <ul className={styles.links}>
            <li>
              <Link href="/collections/your-words-matter">
                <a className={styles.link}>Your Words Matter</a>
              </Link>
            </li>
            <li>
              <Link href="/collections/different-not-less">
                <a className={styles.link}>Different Not Less</a>
              </Link>
            </li>
            <li>
              <Link href="/collections/slp-professional">
                <a className={styles.link}>SLP Professional</a>
              </Link>
            </li>
            <li>
              <Link href="/collections/educator">
                <a className={styles.link}>Educator</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Information</h3>
          <ul className={styles.links}>
            <li>
              <Link href="/about">
                <a className={styles.link}>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/sensory-features">
                <a className={styles.link}>Sensory Features</a>
              </Link>
            </li>
            <li>
              <Link href="/shipping">
                <a className={styles.link}>Shipping</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className={styles.link}>Contact</a>
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
          <Link href="/privacy-policy">
            <a className={styles.legalLink}>Privacy Policy</a>
          </Link>
          <Link href="/terms-of-service">
            <a className={styles.legalLink}>Terms of Service</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
