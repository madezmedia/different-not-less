import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a className={styles.logoLink}>
            <span className={styles.logoText}>Different Not Less</span>
          </a>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/collections">
              <a className={styles.navLink}>Collections</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about">
              <a className={styles.navLink}>About</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact">
              <a className={styles.navLink}>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
