"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import api from '@/config/axiosConfig';

const SignupPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        aadharNumber: '',
        dateOfBirth: ''
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
      try {
          setLoading(true);
          const response = await api.post("/api/users/signup", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
          console.log("Signup success", response.data);
          router.push("/verify/phone");
          
      } catch (error:any) {
          console.log("Signup failed", error.message);
          
          toast.error(error.message);
      }finally {
          setLoading(false);
      }
    }

    useEffect(() => {
      if (user.email.length>0 && user.phoneNumber.length > 0 && user.name.length > 0 && user.aadharNumber.length > 0 && user.dateOfBirth.length > 0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true)
      }

    },[user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value
        });
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        onSignup();
        // console.log('Form submitted:', user);
      };

    // const 
  return (
    <div className="container">
      <div className="signup-box">
        <h2>{loading ? "Processing" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="input-group">
            <label htmlFor="aadharNumber">Aadhar Number</label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={user.aadharNumber}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
            />
          </div>
          <div className="input-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
              placeholder="Enter your date of birth"
            />
          </div>
          <button type="submit" disabled={buttonDisabled}>Sign Up</button>
        </form>
        <div className="footer-links">
          <span>Already registered?<Link href="/login"> Sign In</Link></span>
        </div>
      </div>
    </div>
  )
}

export default SignupPage