import Link from 'next/link';
import styles from '../src/app/styles/Navbar.module.css';

const Navbar = () => {
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
        <Link href="/login">
        Login
        </Link>
        <Link href="/signup">
        Register
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

