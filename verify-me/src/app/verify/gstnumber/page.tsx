"use client"

import { useState } from 'react';
import axios from 'axios';

const GSTVerification = () => {
  const [gstNumber, setGstNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGstNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      } else if (response.data.Failed) {
        setMessage('Invalid GST Number');
      } else {
        setMessage('Unexpected response format');
      }
    } catch (error: any) {
      setMessage('Error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <h1>GST Verification</h1>
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default GSTVerification;
