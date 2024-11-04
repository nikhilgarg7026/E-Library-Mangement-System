'use client';

import { useState, useEffect } from 'react';
import styles from '../../styles/PurchasePage.module.css';

const PurchasePage = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`);
        if (!response.ok) throw new Error('Book not found');
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchBook();
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    // Handle purchase logic here (e.g., API call to process payment)
    alert('Purchase successful!');
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{book.title}</h1>
      <p className={styles.author}>Author: {book.author}</p>
      <p className={styles.price}>Price: ${book.price}</p>
      <p className={styles.description}>{book.description}</p>

      <form onSubmit={handlePurchase} className={styles.form}>
        <h2>Purchase Book</h2>
        <input type="text" name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={handleInputChange} className={styles.input} required />
        <input type="text" name="cardHolder" placeholder="Card Holder Name" value={paymentInfo.cardHolder} onChange={handleInputChange} className={styles.input} required />
        <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" value={paymentInfo.expiry} onChange={handleInputChange} className={styles.input} required />
        <input type="text" name="cvv" placeholder="CVV" value={paymentInfo.cvv} onChange={handleInputChange} className={styles.input} required />
        <button type="submit" className={styles.button}>Confirm Purchase</button>
      </form>
    </div>
  );
};

export default PurchasePage;
