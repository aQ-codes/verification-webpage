"use client";
import React, { useEffect, useState } from 'react';
import OtpLogin from '@/components/OtpLogin';
import styles from './Login.module.css';
import Link from 'next/link';
import api from '@/config/axiosConfig';

const VerifyPhonePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});
  const [phoneNumberUpdated, setPhoneNumberUpdated] = useState(false);

  useEffect(() => {
    // Fetch user data from session storage
    const getUserData = () => {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        try {
          const userdata = JSON.parse(userString);
          setUser(userdata);
          if (userdata.phoneNumber) {
            setPhoneNumber(userdata.phoneNumber); // Set initial phoneNumber state
          }
        } catch (error) {
          console.error('Error parsing user data from session storage:', error);
        }
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (phoneNumberUpdated) {
      // Update user object with the latest phoneNumber
      setUser(prevUser => ({
        ...prevUser,
        phoneNumber
      }));
    }
  }, [phoneNumber, phoneNumberUpdated]);

  useEffect(() => {
    // Handle signup when success is true and user state is updated
    const signupUser = async () => {
      if (success) {
        try {
          console.log("Sending user data:", user);
          const response = await api.post("/api/users/signup", user, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("Signup success", response.data);
        } catch (error) {
          console.error("Signup failed", error);
        }
      }
    };

    signupUser();
  }, [success, user]);

  // Callback function to handle phone number update from child component
  const handlePhoneNumberUpdate = (newPhoneNumber:string) => {
    setPhoneNumber(newPhoneNumber);
    setPhoneNumberUpdated(true); // Indicate that phone number has been updated
  };

  return (
    <div className={styles.container}>
      <h1>Verify Your Phone Number</h1>
      {phoneNumber && <OtpLogin 
        defaultPhoneNumber={phoneNumber} 
        setPhoneNumberfromChild={handlePhoneNumberUpdate} 
        setSuccessfromChild={setSuccess} 
      />}
      
      <div>
        <span><Link href="/verify/email"> Skip</Link></span>
      </div>
    </div>
  );
};

export default VerifyPhonePage;
