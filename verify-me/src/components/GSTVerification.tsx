"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/config/axiosConfig'; // Assuming you have an axios instance configured

// Define the props interface
interface GSTVerificationProps {
  userId: string;
}

const GSTVerification: React.FC<GSTVerificationProps> = ({ userId }) => {
  const [gstNumber, setGstNumber] = useState<string>('');
  const [verifiedGST, setVerifiedGST] = useState<string | null>(null); // Holds the verified GST number
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGSTNumber = async () => {
      try {
        const response = await api.get(`/api/users/gstin/${userId}`);
        if (response.data.gstin) {
          setVerifiedGST(response.data.gstin);
          setMessage('GSTIN is already verified.');
        } else {
          setVerifiedGST(null);
        }
      } catch (error: any) {
        setError('Failed to fetch GST number: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGSTNumber();
  }, [userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGstNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset error state before making a new request

    const options = {
      method: 'POST',
      url: 'https://gst-details2.p.rapidapi.com/GST/Gstverify',
      headers: {
        'x-rapidapi-key': 'e20e50b032mshc53bbecfaa6ca1ep1cb2abjsn5211338c544b',
        'x-rapidapi-host': 'gst-details2.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        gstnumber: gstNumber,
        consent: 'Y',
        consent_text: 'I hereby declare my consent agreement for fetching my information via way2risetech API',
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data.Succeeded) {
        setMessage('GSTIN Verified');
        console.log(response.data.Succeeded.Gst_Details);

        // Make a PUT request to update the GSTIN in the database
        await updateGSTInDatabase(gstNumber);
      } else if (response.data.Failed) {
        setMessage('Invalid GST Number');
      } else {
        setMessage('Unexpected response format');
      }
    } catch (error: any) {
      setMessage('Error occurred: ' + error.message);
      setError('Error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateGSTInDatabase = async (verifiedGstNumber: string) => {
    try {
      const response = await api.put(`/api/users/${userId}/update-gstin`, {
        gstin: verifiedGstNumber,
      });

      if (response.status === 200) {
        setMessage('GSTIN updated in the database successfully!');
        setVerifiedGST(verifiedGstNumber); // Update the local state to reflect the verified GST
      } else {
        setMessage('Failed to update GSTIN in the database.');
      }
    } catch (err: any) {
      setError('Failed to update GSTIN in the database: ' + err.message);
    }
  };

  return (
    <div>
      <h1>GST Verification</h1>
      {loading ? (
        <p>Loading...</p>
      ) : verifiedGST ? (
        <p>Your GSTIN ({verifiedGST}) is already verified.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="gstNumber">Enter GST Number:</label>
          <input
            type="text"
            id="gstNumber"
            value={gstNumber}
            onChange={handleInputChange}
            placeholder="Enter your GST number"
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GSTVerification;
