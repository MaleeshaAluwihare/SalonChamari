import React, { useState } from 'react';
import axios from 'axios';
import styles from "../../css/Yasiru/EmailStyle.module.css"; // Import CSS module

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/EmpMailsend/mail', { email, subject, body });
      setMessage('Email sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to send email.');
    }
  };

  return (
    <div className={styles.EmailForm}> {/* Use className from module.css */}
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default EmailForm;
