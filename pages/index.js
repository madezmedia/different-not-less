import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Different Not Less Apparel</title>
        <meta name="description" content="Sensory-friendly apparel celebrating AAC, autism acceptance, and inclusive communication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Different Not Less</span> Apparel
        </h1>

        <p className={styles.description}>
          Sensory-friendly apparel celebrating AAC, autism acceptance, and inclusive communication
        </p>

        <div className={styles.countdown}>
          <h2>Launching April 2, 2025</h2>
          <p>World Autism Awareness Day</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Your Words Matter Collection</h2>
            <p>Apparel featuring empowering messages about the importance of communication and inclusive language.</p>
          </div>

          <div className={styles.card}>
            <h2>Different Not Less Collection</h2>
            <p>Our flagship collection celebrating neurodiversity and the message that being different doesn't mean less valuable or capable.</p>
          </div>

          <div className={styles.card}>
            <h2>SLP Professional Collection</h2>
            <p>Apparel designed specifically for speech-language pathologists.</p>
          </div>

          <div className={styles.card}>
            <h2>Educator Collection</h2>
            <p>Apparel for special education teachers and inclusive classroom educators.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Different Not Less Apparel. All rights reserved.</p>
      </footer>
    </div>
  );
}
