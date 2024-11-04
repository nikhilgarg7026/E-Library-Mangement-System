'use client'
import Link from 'next/link';
import styles from '../src/app/styles/Navbar.module.css';
import Cookies from 'js-cookie';

const UserNavbar = () => {

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
       // Remove all relevant cookies
      Cookies.remove('userId');
      Cookies.remove('userType');
      Cookies.remove('name');
      
      // Redirect to the home page
       window.location.href = '/';
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          E-Library
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/books">
            Books
        </Link>
        <Link href="/issued-book">
            Issued Book
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;

