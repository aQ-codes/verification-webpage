"use client"

import React, { useEffect, useState } from 'react';
import styles from './styles/VerifyPhone.module.css';
import api from '@/config/axiosConfig';

// Define the props interface
interface VerifyEmailProps {
  userId: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ userId }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>('');
  const [sentOtp, setSentOtp] = useState<string | null>(null);

  useEffect(() => {

    console.log(userId)
    const fetchEmail = async () => {
      try {
        const response = await api.get(`/api/users/email/${userId}`);
        if (response.data.email) {
          setEmail(response.data.email);
        } else {
          setEmail(null); // Email not available
        }
      } catch (err) {
        setError('Failed to fetch email');
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [userId]);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    if (!email) return;
    const otp = generateOtp();
    setSentOtp(otp);

    try {
      await api.post('/api/sendEmail', { email, otp });
      alert('OTP sent to your email');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      alert('Email verified successfully');
    } else {
      alert('Invalid OTP');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.main}>
      {email ? (
        <>
          <h1>Your Email has been verified!</h1>
          <h2>Email: {email}</h2>
        </>
      ) : (
        <>
          <h1>Verify Email</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
