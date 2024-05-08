import React, { useState } from 'react';
import axios from 'axios';
import  styles from '../../css/nisalka/forgotStyles.module.css'

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateOTP = async () => {
    try {
      const response = await axios.post('http://localhost:8070/api/users/send-otp', { email });
      if (response.status === 200) {
        setMessage('OTP sent successfully');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:8070/api/users/verify-otp', { email, otp, newPassword });
      if (response.status === 200) {
        setMessage('Password updated successfully');
      }
    } catch (error) {
      console.error('Error verifying OTP and updating password:', error);
      setMessage('Error verifying OTP and updating password');
    }
  };

  return (
    <div className={styles.container}>
  <div className={styles.form_container}>
    <h2 className={styles.form_heading}>Password Reset</h2>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className={styles.form_input}
    />
    <button onClick={handleGenerateOTP} className={styles.form_button}>
      Generate OTP
    </button>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      className={styles.form_input}
    />
    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      className={styles.form_input}
    />
    <button onClick={handleVerifyOTP} className={styles.form_button}>
      Verify OTP & Update Password
    </button>
    {message && <p className={styles.form_message}>{message}</p>}
  </div>
</div>
  );
};

export default PasswordReset;
