"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './EmailVerify.module.css';
import { useRouter } from 'next/navigation';
import api from '@/config/axiosConfig';

export default function VerifyEmail() {
  const router = useRouter();


  const [email, setEmail] = useState('');
  const [user, setUserState] = useState({});
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState<string | null>(null);



  useEffect(() => {
    // Fetch user data from session storage

    const getUserData = () => {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        try {
          const userdata = JSON.parse(userString);
          setUserState(userdata);
          if (userdata.email) {
            setEmail(userdata.email); // Set initial email state
          }
        } catch (error) {
          console.error('Error parsing user data from session storage:', error);
        }
      }
    };
    getUserData();
  }, []);

// generate a random 6 digit number 
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    const otp = generateOtp();
    setSentOtp(otp);

    try {
      await axios.post('/api/sendEmail', { email, otp });
      alert('OTP sent to your email');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
   };


  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      alert('Email verified successfully');
      signupUser()

    } else {
      alert('Invalid OTP');
    }
  };


  const signupUser = async () => {
      try {
        console.log("Sending user data:", user);
        const response = await api.post("/api/users/signup", user, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)
        sessionStorage.setItem('user', JSON.stringify(response.data.savedUser));
        router.push(`/profile/${response.data.savedUser._id}`);
      } catch (error) {
        console.error("Signup failed", error);
      }
  };

  return (
    <div className={styles.main}>
      <h1>Verify Your Email</h1>
      <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      </div>
     <div>
     <input
        type="text"
        placeholder="Enter OTP received"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>

     </div>
     
    </div>
  );
}
