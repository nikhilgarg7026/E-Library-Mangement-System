'use client';
import { useState, useRouter } from 'react';
import styles from '../../styles/Add.module.css';
import MessageBox from '../../../../../components/MessageBox';

const AddBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null); // New state for price
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [link, setLink] = useState('');

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublishedDate('');
    setStatus('');
    setRating('');
    setImage(null);
    setPrice(null); // Reset price
    setError('');
    setSuccessMessage('');
    setLink('');
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !author || !isbn || !image || !status) {
      setError('Please fill in all required fields.');
      return;
    }

    const parsedPublishedDate = publishedDate ? new Date(publishedDate) : null;
    if (publishedDate && isNaN(parsedPublishedDate.getTime())) {
      setError('Invalid published date.');
      return;
    }

    const parsedPrice = price ? parseFloat(price) : null; // Parse price to Float
    if (status === 'paid' && isNaN(parsedPrice)) {
      setError('Invalid price.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    if (publishedDate) {
      formData.append('publishedDate', parsedPublishedDate.toISOString());
    }
    formData.append('status', status);
    if (rating) {
      formData.append('rating', rating);
    }
    formData.append('image', image);
    if (link) {
      formData.append('link', link);
    }
    if (status === 'paid' && parsedPrice !== null) {
      formData.append('price', parsedPrice); // Append parsed price if status is paid
    }

    console.log('Form Data:', {
      title,
      author,
      isbn,
      publishedDate: parsedPublishedDate,
      status,
      rating,
      link,
      price: parsedPrice, // Include parsed price in log
    }); // Log the form data for debugging

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to add book');
        return;
      }

      resetForm();
      setSuccessMessage('Book added successfully!');
      setTimeout(() => router.push(`/admin-dashboard/books`), 1500);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Book</h1>
      <form onSubmit={handleAddBook} className={styles.form}>
        {/* {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>} */}

        <label className={styles.label}>
          Book Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          ISBN
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Published Date
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Rating (1-5)
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Link
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className={styles.input}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </label>
        {status === 'paid' && (
          <label className={styles.label}>
            Price
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className={styles.input}
            />
          </label>
        )}
        <button type="submit" className={styles.button}>Add Book</button>
      </form>
      <div className={styles.messagebox}>
          <MessageBox message={message} type={messageType} />
        </div>
    </div>
  );
};

export default AddBook;
