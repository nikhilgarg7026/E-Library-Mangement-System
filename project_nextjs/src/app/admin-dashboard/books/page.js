'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookCard from '../../../../components/AdminBookCard';
import styles from '../styles/BooksPage.module.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch books when the page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books',  {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle book deletion
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Update the state after deletion
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Management</h1>
      <div className={styles.buttonContainer}>
      <Link href="/admin-dashboard/books/add" className={styles.button}>
        Add New Book
      </Link>
      <Link href="/admin-dashboard/books/searchbooks" className={styles.button}>
        Search Book
      </Link>
    </div>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={() => handleDeleteBook(book.id)} />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
