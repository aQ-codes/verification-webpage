'use client';

import React, { useState } from 'react';
import { verificationItems } from '@/constants/constants';
import Card from '@/components/ui/card';
import styles from './Userprofile.module.css';
import VerifyPhone from '@/components/VerifyPhone';
import VerifyEmail from '@/components/VerifyEmail';
import AadhaarValidation from '@/components/AadhaarValidation';
import GSTVerification from '@/components/GSTVerification';
import BankAccountVerification from '@/components/BankAccountVerification';
import PANVerification from '@/components/PANVerification';
import { useParams } from 'next/navigation';

// Mapping of titles to components that accept userId as a prop
const componentMap: { [key: string]: React.FC<{ userId: string }> } = {
  'Phone Number': VerifyPhone,
  'Email': VerifyEmail,
  'Aadhaar': AadhaarValidation,
  'PAN': PANVerification ,
  'GSTIN': GSTVerification,
  'Bank': BankAccountVerification,
};

const UserProfile = () => {
  const params = useParams();
  let userId = params.id;

  // Ensure userId is a string
  if (Array.isArray(userId)) {
    userId = userId[0]; // Pick the first element if it's an array
  }

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    setSelectedTitle(title);
  };

  // Get the selected component from the map
  const SelectedComponent = componentMap[selectedTitle || ''];

  return (
    <>
      <div className={styles.verificationList}>
        {verificationItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.title)}
            className={`${styles.cardContainer} ${selectedTitle === item.title ? styles.selectedCard : ''}`}
          >
            <Card title={item.title} img1={item.img1} img2={item.img2} />
          </div>
        ))}
      </div>

      <div className={styles.componentsection}>
        {/* Render the selected component with userId as a prop */}
        {SelectedComponent && <SelectedComponent userId={userId} />}
      </div>
    </>
  );
};

export default UserProfile;
