'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/Signup.module.css';
import MessageBox from '../../../../components/MessageBox';
import Cookies from 'js-cookie';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default to 'user'
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
    setMessage('');
    setMessageType('');

    // Basic password confirmation check
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      setMessageType('error');
      return;
    }

    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, userType }), // Include userType
    });

    const Response = await response.json();

    if (Response.success) {      
      setMessage('New user added successfully');
      setMessageType('success');

      // Redirect after signup
    //   window.location.href = '/user-dashboard'; no need to redirect
    } else {
      console.error('Signup error:', Response.message);
      setMessage(Response.message);
      setMessageType('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupCard}>
        <h2 className={styles.title}>Create an Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
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
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="userType" className={styles.label}>User Type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className={styles.input}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.footerText}>Already have an account? <a href="/login">Log In</a></p>
      </div>
      {message && (
        <div className={styles.messagebox}>
          <MessageBox message={message} type={messageType} />
        </div>
      )}
    </div>
  );
};

export default Signup;
