'use client';
import { useState, useEffect } from 'react';
import BookCard from './AdminBookCard';
import styles from '../src/app/styles/SearchBooks.module.css';

const SearchBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');

  const fetchBooks = async () => {
    const response = await fetch(`/api/books/search?title=${title}&author=${author}&sort=${sort}&order=${order}`);
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, [title, author, sort, order]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.searchInput}
      />
      <input
        type="text"
        placeholder="Search by author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.sortOptions}>
        <label>
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={styles.sortSelect}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publishedDate">Published Date</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value)} className={styles.sortSelect}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
