import React, { useEffect, useState } from 'react';
import styles from './styles/VerifyPhone.module.css';
import api from '@/config/axiosConfig';

// Define the props interface
interface VerifyPhoneProps {
  userId: string;
}

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ userId }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        // Use the userId received as a prop
        const response = await api.get(`/api/users/phone/${userId}`);
        if (response.data.phoneNumber) {
          setPhoneNumber(response.data.phoneNumber);
        } else {
          setPhoneNumber('Phone number not available');
        }
      } catch (err) {
        setError('Failed to fetch phone number');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneNumber();
  }, [userId]); // Add userId as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.main}>
      <h1>Your Phone Number has been verified!</h1>
      <h2>Mobile Number: {phoneNumber}</h2>
    </div>
  );
};

export default VerifyPhone;
