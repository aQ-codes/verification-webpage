"use client"

import { useState } from 'react';
import axios from 'axios';

const BankAccountVerification = () => {
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [bankIfscCode, setBankIfscCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      } else {
        setVerificationMessage('Invalid Account Number');
      }
    } catch (error) {
      console.error('Error verifying bank account:', error);
      setVerificationMessage('An error occurred while verifying the account.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bankAccountNo">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccountNo"
            value={bankAccountNo}
            onChange={(e) => setBankAccountNo(e.target.value)}
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
            required
          />
        </div>
        <button type="submit">Verify Account</button>
      </form>
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
};

export default BankAccountVerification;
