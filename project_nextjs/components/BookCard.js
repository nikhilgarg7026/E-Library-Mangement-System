import Link from 'next/link';
import styles from '../src/app/styles/BookCard.module.css';

const BookCard = ({ book }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={book.image} alt={book.title} />
      </div>
      <h3 className={styles.cardTitle}>{book.title}</h3>
      <p className={styles.cardAuthor}>Author: {book.author}</p>
      <div className={styles.cardRating}>
        {renderStars(book.rating)}
      </div>
      <Link href={`/login`} className={styles.cardLink}>
        Read Book
      </Link>
    </div>
  );
};

export default BookCard;
