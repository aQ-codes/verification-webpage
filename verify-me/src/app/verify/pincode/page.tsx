"use client"

import { useState } from 'react';
import axios from 'axios';

// Define the type for the response data
interface Address {
  area: string;
  district: string;
  lat: number;
  lng: number;
  pincode: number;
  state: string;
}

const PinCodeSearch = () => {
  const [pinCode, setPinCode] = useState('');
  const [results, setResults] = useState<Address[]>([]);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value);
  };

  const searchAddress = async () => {
    if (!/^\d{6}$/.test(pinCode)) {
      setMessage('Pin code must be 6 digits.');
      return;
    }

    const options = {
      method: 'GET',
      url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pinCode}`,
      headers: {
        'x-rapidapi-key': 'e20e50b032mshc53bbecfaa6ca1ep1cb2abjsn5211338c544b',
        'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request<Address[]>(options);
      const data = response.data;
      if (data && data.length > 0) {
        setResults(data);
        setMessage('');
      } else {
        setMessage('No results found for the entered pin code.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while searching for the address.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={pinCode}
        onChange={handleChange}
        placeholder="Enter Pin Code"
      />
      <button onClick={searchAddress}>Search Address</button>
      {message && <p>{message}</p>}
      <div>
        {results.map((result, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>District:</strong> {result.district}</p>
            <p><strong>Latitude:</strong> {result.lat}</p>
            <p><strong>Longitude:</strong> {result.lng}</p>
            <p><strong>Pin Code:</strong> {result.pincode}</p>
            <p><strong>State:</strong> {result.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinCodeSearch;
