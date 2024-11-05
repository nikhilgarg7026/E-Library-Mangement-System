'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/Login.module.css';
import MessageBox from '../../../components/MessageBox';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message before new submission
    setMessageType('');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const Response = await response.json();
    if (Response.success) {
      console.log('Login successful:', Response.data.userId);
      
      // Store the user type in cookies
      Cookies.set('userId', Response.data.id, { expires: 1 });  // Set cookie for 1 days
      Cookies.set('userType', Response.data.userType, { expires: 1 });
      Cookies.set('name', Response.data.name, { expires: 1 });

      // set message to show user login successfully
      setMessage(`${Response.data.name} login sucessfully`); // Set success message
      setMessageType('success');

     // Redirect after login
     if(Response.data.userType === 'admin'){
      window.location.href = '/admin-dashboard';
     }
     else{
      window.location.href = '/user-dashboard';
     }
    } else {
      console.error('Login error:', Response.message);
      setMessage(Response.message); // Set error message
      setMessageType('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Login to e-Library</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.footerText}>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
      {message && (
        <div className={styles.messagebox}>
          <MessageBox message={message} type={messageType} />
        </div>
      )}
    </div>
  );
};

export default Login;
