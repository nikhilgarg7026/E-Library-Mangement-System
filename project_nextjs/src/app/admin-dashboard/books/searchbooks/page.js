'use client';

import { useEffect, useState } from 'react';
import SearchBooks from '../../../../../components/AdminSearchBooks';
import styles from '../../styles/BooksPage.module.css';

const BooksPage = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Books</h1>
      <SearchBooks />
    </div>
  );
};

export default BooksPage;
