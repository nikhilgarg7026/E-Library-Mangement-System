'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookCard from '../../../components/BookCard';
import styles from '../styles/BooksPage.module.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Books</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
