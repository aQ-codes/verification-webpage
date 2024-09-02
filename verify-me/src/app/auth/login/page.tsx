"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// import {axios} from "axios";

const LoginPage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        aadharNumber: '',
        dateOfBirth: ''
    })

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
        console.log('Form submitted:', user);
      };

    // const 
  return (
    <div className="container">
      <div className="signup-box">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <div className="footer-links">
          <Link href="/login">No Account? Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage