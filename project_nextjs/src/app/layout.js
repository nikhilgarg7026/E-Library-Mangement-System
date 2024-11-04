// import Navbar from '../../components/Navbar';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Navbar />
//         {children}
//       </body>
//     </html>
//   );
// }

'use client'
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import AdminNavbar from '../../components/AdminNavbar';
import UserNavbar from '../../components/UserNavbar';
import Cookies from 'js-cookie';
import './styles/globals.css';

export default function RootLayout({ children }) {

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const type = Cookies.get('userType'); // Get user type from cookies
    setUserType(type);
  }, []);

  return (
    <html lang="en">
      <body>
      {!userType && ( <Navbar /> )}
      {userType === 'admin' && ( <AdminNavbar /> )}
      {userType ==='user' && ( <UserNavbar /> )}
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}

