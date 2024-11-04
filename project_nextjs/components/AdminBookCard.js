import Link from 'next/link';
import styles from '../src/app/styles/BookCard.module.css';

const BookCard = ({ book, onDelete }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={styles.star}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={book.image} alt={book.title} />
      </div>
      <h3 className={styles.cardTitle}>{book.title}</h3>
      <p className={styles.cardAuthor}>Author: {book.author}</p>
      <div className={styles.cardRating}>{renderStars(book.rating)}</div>
      <div className={styles.actions}>
      <Link href={`/admin-dashboard/books/${book.id}/?id=${book.id}`} className={styles.cardLink}>
        View Details
      </Link>
      <button onClick={onDelete} className={styles.deleteButton}>
        Delete
      </button>
    </div>
    </div>
  );
};

export default BookCard;
