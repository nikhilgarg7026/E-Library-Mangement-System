'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Edit.module.css';

const EditBook = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
    rating: '',
    image: null,
    link: '',
    status: '',
    price: '' // New state for price
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBook = async () => {
    const response = await fetch(`/api/books/${id}`);
    const data = await response.json();
    setBook(data);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setBook((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleEditBook = async (e) => {
    e.preventDefault();

    // Validation
    const { title, author, isbn, image, status, price } = book;
    if (!title || !author || !isbn || (status === 'paid' && !price)) {
      setError('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('publishedDate', book.publishedDate);
    if (book.rating) formData.append('rating', book.rating);
    if (book.link) formData.append('link', book.link);
    formData.append('status', status);
    if (status === 'paid') formData.append('price', price); // Append price if status is paid
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to update book');
        return;
      }

      setSuccessMessage('Book updated successfully!');
      setTimeout(() => router.push(`/admin-dashboard/books/${book.id}/?id=${book.id}`), 1500);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Book</h1>
      <form onSubmit={handleEditBook} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <label className={styles.label}>
          Book Title
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Author
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          ISBN
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Published Date
          <input
            type="date"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Rating (1-5)
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Link
          <input
            type="url"
            name="link"
            value={book.link}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Status
          <select
            name="status"
            value={book.status}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </label>
        {book.status === 'paid' && (
          <label className={styles.label}>
            Price
            <input
              type="number"
              step="0.01"
              name="price"
              value={book.price}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
        )}
        <button type="submit" className={styles.button}>Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
