import styles from '../styles/Button.module.css';

const HomePage = () => {
  return (
    <div className={`${styles.container}`}>
      <h1 className={styles.title}>Welcome to the E-Library</h1>
      <p className={styles.subtitle}>Your gateway to endless knowledge.</p>
      <a href="/admin-dashboard/books" className={styles.button}>
        View Books
      </a>
    </div>
  );
};

export default HomePage;



