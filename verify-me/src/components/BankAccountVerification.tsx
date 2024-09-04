"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/config/axiosConfig'; // Import your API configuration
import styles from "@/components/styles/BankVerify.module.css";

interface BankAccountVerificationProps {
  userId: string;
}

const BankAccountVerification: React.FC<BankAccountVerificationProps> = ({ userId }) => {
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [bankIfscCode, setBankIfscCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBankAccount = async () => {
      try {
        const response = await api.get(`/api/users/bank/${userId}`);
        const { bankAccountNumber } = response.data;

        if (bankAccountNumber) {
          setBankAccountNo(bankAccountNumber);
        } else {
          setBankAccountNo('');
        }
      } catch (err) {
        setError('Failed to fetch bank account details');
      } finally {
        setLoading(false);
      }
    };

    fetchBankAccount();
  }, [userId]);

  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankAccountNo(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bankIfscCode || !bankAccountNo) {
      setVerificationMessage('Please provide both bank account number and IFSC code.');
      return;
    }

    try {
      // First API call to validate the bank account
      const postResponse = await axios.post(
        'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account',
        {
          task_id: '123',
          group_id: '1234',
          data: {
            bank_account_no: bankAccountNo,
            bank_ifsc_code: bankIfscCode,
          },
        },
        {
          headers: {
            'x-rapidapi-key': 'e20e50b032mshc53bbecfaa6ca1ep1cb2abjsn5211338c544b',
            'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        }
      );

      const requestId = postResponse.data.request_id;

      // Second API call to check the verification status
      const getResponse = await axios.get(
        'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks',
        {
          params: { request_id: requestId },
          headers: {
            'x-rapidapi-key': 'e20e50b032mshc53bbecfaa6ca1ep1cb2abjsn5211338c544b',
            'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
          },
        }
      );

      const verificationResult = getResponse.data[0].result;

      if (verificationResult.account_exists === 'YES') {
        setVerificationMessage('Account Number Verified');

        // Update Bank Account verification status in the database
        await api.put(`/api/users/${userId}/verify-bank-account`, { bankAccountNumber: bankAccountNo });
      } else {
        setVerificationMessage('Invalid Account Number');
      }
    } catch (error) {
      console.error('Error verifying bank account:', error);
      setVerificationMessage('An error occurred while verifying the account.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.main}>
      {bankAccountNo ? (
        <div>
          <h1>Your Bank Account has been verified!</h1>
          <h2>Bank Account Number: {bankAccountNo}</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bankAccountNo">Bank Account Number:</label>
            <input
              type="text"
              id="bankAccountNo"
              value={bankAccountNo}
              onChange={handleBankAccountChange}
              placeholder="Enter your bank account number"
              required
            />
          </div>
          <div>
            <label htmlFor="bankIfscCode">Bank IFSC Code:</label>
            <input
              type="text"
              id="bankIfscCode"
              value={bankIfscCode}
              onChange={(e) => setBankIfscCode(e.target.value)}
              placeholder="Enter IFSC code"
              required
            />
          </div>
          <button type="submit">Verify Account</button>
          {verificationMessage && <p>{verificationMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default BankAccountVerification;
