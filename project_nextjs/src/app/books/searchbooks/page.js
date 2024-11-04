'use client';

import { useEffect, useState } from 'react';
import SearchBooks from '../../../../components/SearchBooks';
import styles from '../../styles/BooksPage.module.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Books</h1>
      {error && <p className={styles.error}>{error}</p>}
      <SearchBooks />
    </div>
  );
};

export default BooksPage;
