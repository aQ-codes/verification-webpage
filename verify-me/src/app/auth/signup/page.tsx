"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './Signup.module.css';
import api from '@/config/axiosConfig';


const SignupPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        aadharNumber: '',
        dateOfBirth: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const errors: any = {};

        if (!user.name.trim()) {
            errors.name = 'Name is required';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email || !emailPattern.test(user.email)) {
            errors.email = 'Invalid email address';
        }

        if (!user.phoneNumber || !/^\+\d{1,3}\d{10}$/.test(user.phoneNumber)) {
          errors.phoneNumber = 'Phone number must include country code and be 10 digits long';
      }

        if (!user.aadharNumber || !/^\d{12}$/.test(user.aadharNumber)) {
            errors.aadharNumber = 'Aadhar number must be 12 digits';
        }

        if (!user.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        return errors;
    };

    const onSignup = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            sessionStorage.setItem('user', JSON.stringify(user));
            // const response = await api.post("/api/users/signup", user, {
            //     headers: {
            //       'Content-Type': 'application/json'
            //     }
            //   });
            router.push("/verify/phone");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            // toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
      if(user.email.length > 0 && user.email.length > 0 && user.phoneNumber.length > 0 && user.aadharNumber.length > 0 && user.dateOfBirth.length > 0) {
          setButtonDisabled(false);
      } else {
          setButtonDisabled(true);
      }
  }, [user]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: '' // Clear error message when user starts typing
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSignup();
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupBox}>
                <h2>{loading ? "Processing" : "Create Your Account"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number with country code"
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="aadharNumber"
                            name="aadharNumber"
                            value={user.aadharNumber}
                            onChange={handleChange}
                            placeholder="Enter your Aadhaar number"
                        />
                        {errors.aadharNumber && <p className="error">{errors.aadharNumber}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input 
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={user.dateOfBirth}
                            onChange={handleChange}
                        />
                        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
                    </div>
                    <button type="submit" disabled={buttonDisabled}>{loading ? "Signing Up..." : "Sign Up"}</button>
                </form>
                <div className={styles.footerLinks}>
                    <span>Already registered?<Link href="/login"> Sign In</Link></span>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
