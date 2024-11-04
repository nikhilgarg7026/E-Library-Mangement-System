'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/user-management.module.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/getAllUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch('/api/deleteUser', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleEdit = (id) => {
    // Implement the logic to edit user
    window.location.href = `/admin-dashboard/edituser/${id}?id=${id}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      <Link href="/admin-dashboard/adduser" className={styles.button}>
        Add New User
      </Link>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(user.id)} className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
