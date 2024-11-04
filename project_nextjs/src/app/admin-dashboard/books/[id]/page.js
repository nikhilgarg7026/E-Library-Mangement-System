'use client'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../../styles/BookDetail.module.css'; // Create this CSS module for styling

const BookDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [book, setBook] = useState(null);

  // Fetch book data using the id
  const fetchBook = async (id) => {
    const response = await fetch(`/api/books/${id}`);
    const data = await response.json();
    setBook(data);
  };


  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={styles.star}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleEditClick = () => {
    router.push(`/admin-dashboard/books/${id}/edit`);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {book.image ? <img src={book.image} alt={book.title} /> : <p className={styles.error}>Image is missing.</p>}
      </div>
      <h1 className={styles.title}>{book.title ? book.title : 'Title is missing'}</h1>
      <p className={styles.author}>{book.author ? `Author: ${book.author}` : 'Author is missing'}</p>
      <p className={styles.isbn}>{book.isbn ? `ISBN: ${book.isbn}` : 'ISBN is missing'}</p>
      <p className={styles.publishedDate}>
        {book.publishedDate ? `Published Date: ${new Date(book.publishedDate).toLocaleDateString()}` : 'Published Date is missing'}
      </p>
      <p className={styles.status}>
        {book.status ? `Status: ${book.status}` : 'Status is missing'}
      </p>
      {book.status === 'paid' && (
      <p className={styles.price}>
        {book.price ? `Price: $${book.price}` : 'Price is missing'}
      </p>
      )}

      {/* <div className={styles.rating}>
        {book.rating !== null && book.rating !== undefined ? `Rating: ${renderStars(book.rating)}` : 'Rating is missing'}
      </div> */}
      <button className={styles.editButton} onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
};

export default BookDetailPage;
