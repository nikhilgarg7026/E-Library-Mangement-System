'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles/Signup.module.css';
import MessageBox from '../../../../../components/MessageBox';

const EditUser = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`/api/getUserDetails?id=${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setName(data.name);
          setEmail(data.email);
          setUserType(data.userType);
        } catch (error) {
          setMessage(error.message);
          setMessageType('error');
        }
      };

      fetchUserDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (password && password !== confirmPassword) {
      setMessage("Passwords don't match.");
      setMessageType('error');
      return;
    }

    const response = await fetch('/api/editUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, data: { name, userType, password } }), // Updating name, userType, and password
    });

    const Response = await response.json();
    if (Response.success) {
      setMessage('User updated successfully');
      setMessageType('success');
    } else {
      console.error('Edit error:', Response.message);
      setMessage(Response.message);
      setMessageType('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupCard}>
        <h2 className={styles.title}>Edit User</h2>
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
            <label htmlFor="email" className={styles.label}>Email (Cannot be changed)</label>
            <input
              type="email"
              id="email"
              value={email}
              className={styles.input}
              disabled
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
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Leave blank if not changing"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="Leave blank if not changing"
            />
          </div>
          <button type="submit" className={styles.button}>Update User</button>
        </form>
        {message && (
          <div className={styles.messagebox}>
            <MessageBox message={message} type={messageType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUser;
