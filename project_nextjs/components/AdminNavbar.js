// import Link from 'next/link';
// import styles from '../src/app/styles/Navbar.module.css';

// const Navbar = () => {

//     const handleLogout = () => {
//       if (window.confirm('Are you sure you want to logout?')) {
//         // signOut();
//       }
//     };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <Link href="/">
//             E-Library
//         </Link>
//       </div>
//       <div className={styles.links}>
//         <Link href="/books-management">
//             Books Management
//         </Link>
//         <Link href="/users-management">
//             User Management
//         </Link>
//         <Link href="/issue-book">
//             Issue Book
//         </Link>
//         <Link href="/return-book">
//             Return Book
//         </Link>
//         <Link href="/Statistics">
//             Statistics
//         </Link>
//         <button onClick={handleLogout} className={styles.logoutButton}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


'use client';

import Link from 'next/link';
import styles from '../src/app/styles/Navbar.module.css';
import Cookies from 'js-cookie';

const AdminNavbar = () => {
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
        <Link href="/">E-Library</Link>
      </div>
      <div className={styles.links}>
        <Link href="/admin-dashboard/books">Books Management</Link>
        <Link href="/admin-dashboard/users-management">User Management</Link>
        <Link href="/admin-dashboard/transactions">Transactions</Link>
        {/* <Link href="/admin-dashboard/issue-book">Issue Book</Link> */}
        {/* <Link href="/admin-dashboard/return-book">Return Book</Link> */}
        {/* <Link href="/admin-dashboard/statistics">Statistics</Link> */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

