'use client'
import React, { useEffect, useState } from 'react';
import '../src/app/styles/MessageBox.module.css';

const MessageBox = ({ message, type }) => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Hide after 3 seconds
  
      return () => clearTimeout(timer); // Cleanup on unmount
    }, []);
  
    if (!visible) return null;
  
    return (
      <div className={`message-box.${type}`}>
        {message}
      </div>
    );
  };

export default MessageBox;
