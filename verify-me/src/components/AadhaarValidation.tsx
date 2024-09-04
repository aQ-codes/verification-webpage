"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/VerifyPhone.module.css';
import api from '@/config/axiosConfig';

// Define the props interface
interface VerifyAadhaarProps {
  userId: string;
}

const AadhaarValidation: React.FC<VerifyAadhaarProps> = ({ userId }) => {
  const [aadhaar, setAadhaar] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [verifyAadhaar, setVerifyAadhaar] = useState<boolean>(false);

  useEffect(() => {
    const fetchAadhaarNumber = async () => {
      try {
        // Make API call to fetch only the Aadhaar number
        const response = await api.get(`/api/users/aadhaar/${userId}`);
        
        if (response.data.aadharNumber) {
          setAadhaar(response.data.aadharNumber);
        } else {
          setAadhaar(null); // Aadhaar not available
        }

        setVerifyAadhaar(response.data.verifyAadhaar || false); // Update verification status
      } catch (err) {
        setError('Failed to fetch Aadhaar number');
      } finally {
        setLoading(false);
      }
    };

    fetchAadhaarNumber();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadhaar(e.target.value);
  };

  const validateAadhaar = async () => {
    if (!aadhaar) return;

    if (!/^\d{12}$/.test(aadhaar)) {
      setMessage('Aadhaar number must be 12 digits.');
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://api.apyhub.com/validate/aadhaar',
      headers: {
        'apy-token': 'APY0fjNPC897oU6Kd3qcguXwjzJ4jKVsjd7zWCxQ3WUWwS7UHfrl6VHaiAxUSgr1selVfOV8wrE7VL',
        'Content-Type': 'application/json',
      },
      data: { aadhaar },
    };

    try {
      const response = await axios.request(options);
      if (response.data.data === true) {
        setMessage('Aadhaar verified.');

        // Update Aadhaar verification status in the database
        await api.put(`/api/users/${userId}/verify-aadhaar`, { verifyAadhaar: true });
        setVerifyAadhaar(true); // Update local state
      } else {
        setMessage('Aadhaar number not found.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while validating the Aadhaar number.');
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
      {verifyAadhaar ? (
        <>
          <h1>Your Aadhaar has been verified!</h1>
          <h2>Aadhaar Number: {aadhaar}</h2>
        </>
      ) : (
        <>
          <h1>Verify Aadhaar</h1>
          <input
            type="text"
            value={aadhaar ?? ''}
            onChange={handleChange}
            placeholder="Enter Aadhaar number"
          />
          <button onClick={validateAadhaar}>Validate Aadhaar</button>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default AadhaarValidation;
