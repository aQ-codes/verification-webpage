"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/config/axiosConfig'; // Assuming you have an axios instance configured

interface PANVerificationProps {
  userId: string;
}

const PANVerification: React.FC<PANVerificationProps> = ({ userId }) => {
  const [panNumber, setPanNumber] = useState<string>('');
  const [verifiedPAN, setVerifiedPAN] = useState<string | null>(null); // Holds the verified PAN number
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPANNumber = async () => {
      try {
        const response = await api.get(`/api/users/pan/${userId}`);
        if (response.data.panNumber) {
          setVerifiedPAN(response.data.panNumber);
          setMessage('PAN Number is already verified.');
        } else {
          setVerifiedPAN(null);
        }
      } catch (error: any) {
        setError('Failed to fetch PAN number: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPANNumber();
  }, [userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPanNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset error state before making a new request

    const userString = sessionStorage.getItem('user');
    let aadhaarNumber = '';

    if (userString) {
      try {
        console.log(userString)
        const userdata = JSON.parse(userString);
        aadhaarNumber = userdata.aadharNumber; // Fetch Aadhaar number from session storage
      } catch (error) {
        console.error('Error parsing user data from session storage:', error);
        setError('Failed to parse user data.');
        setLoading(false);
        return;
      }
    }
    
    if (!aadhaarNumber) {
      setMessage('Aadhaar number is not available.');
      setLoading(false);
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://verify-pan-aadhaar-link.p.rapidapi.com/v3/tasks/async/verify_with_source/pan_aadhaar_link',
      headers: {
        'x-rapidapi-key': 'e20e50b032mshc53bbecfaa6ca1ep1cb2abjsn5211338c544b',
        'x-rapidapi-host': 'verify-pan-aadhaar-link.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
        group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
        data: {
          pan_number: panNumber,
          aadhaar_number: aadhaarNumber
        }
      }
    };

    try {
      console.log("data to send" ,options)
      const postResponse = await axios.request(options);
      console.log(postResponse)
      const requestId = postResponse.data.request_id;
      console.log(requestId)

      // Check the verification status
      const getOptions = {
        method: 'GET',
        url: 'https://verify-pan-aadhaar-link.p.rapidapi.com/v3/tasks',
        params: { request_id: requestId },
        headers: {
          'x-rapidapi-key': 'e20e50b032mshc53bbecfaa6ca1ep1cb2abjsn5211338c544b',
          'x-rapidapi-host': 'verify-pan-aadhaar-link.p.rapidapi.com'
        }
      };

      const getResponse = await axios.request(getOptions);
      console.log(getResponse)
      const status = getResponse.data[0]?.status;


      if (status === 'completed' || status === 'in_progress') {
        setMessage('PAN Number Verified');
        await updatePANInDatabase(panNumber);
      } else {
        setMessage('PAN Number verification is not completed yet.');
      }
    } catch (error: any) {
      setMessage('Error occurred: ' + error.message);
      setError('Error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePANInDatabase = async (verifiedPanNumber: string) => {
    try {
      const response = await api.put(`/api/users/${userId}/update-pan`, {
        panNumber: verifiedPanNumber,
      });

      if (response.status === 200) {
        setMessage('PAN Number updated in the database successfully!');
        setVerifiedPAN(verifiedPanNumber); // Update the local state to reflect the verified PAN
      } else {
        setMessage('Failed to update PAN Number in the database.');
      }
    } catch (err: any) {
      setError('Failed to update PAN Number in the database: ' + err.message);
    }
  };

  return (
    <div>
      <h1>PAN Verification</h1>
      {loading ? (
        <p>Loading...</p>
      ) : verifiedPAN ? (
        <p>Your PAN Number ({verifiedPAN}) is already verified.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="panNumber">Enter PAN Number:</label>
          <input
            type="text"
            id="panNumber"
            value={panNumber}
            onChange={handleInputChange}
            placeholder="Enter your PAN number"
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

export default PANVerification;
