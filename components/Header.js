import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            src="/difnotless.png" 
            alt="Different Not Less Apparel" 
            width={180} 
            height={50} 
            className={styles.logoImage}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className={styles.srOnly}>Different Not Less</span>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/collections" className={styles.navLink}>
              Collections
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
