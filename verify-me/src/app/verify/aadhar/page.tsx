"use client"

import { useState } from 'react';
import axios from 'axios';

const AadhaarValidation = () => {

  const [aadhaar, setAadhaar] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadhaar(e.target.value);
  };

  const validateAadhaar = async () => {
    if (!/^\d{12}$/.test(aadhaar)) {
      setMessage('Aadhaar number must be 12 digits.');
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://api.apyhub.com/validate/aadhaar',
      headers: {
        'apy-token': 'APY0fjNPC897oU6Kd3qcguXwjzJ4jKVsjd7zWCxQ3WUWwS7UHfrl6VHaiAxUSgr1selVfOV8wrE7VL',
        'Content-Type': 'application/json'
      },
      data: { aadhaar: aadhaar }
    };

    try {
      const response = await axios.request(options);
      if (response.data.data === true) {
        setMessage('Aadhaar verified.');
      } else {
        setMessage('Aadhaar number not found.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while validating the Aadhaar number.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={aadhaar}
        onChange={handleChange}
        placeholder="Enter Aadhaar number"
      />
      <button onClick={validateAadhaar}>Validate Aadhaar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AadhaarValidation;
