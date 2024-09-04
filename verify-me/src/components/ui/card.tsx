

import Image from "next/image";
import React from "react";
import styles from "@/app/profile/[id]/Userprofile.module.css";

interface CardProps {
  title: string;
  img1: string;
  img2: string;
}

const Card: React.FC<CardProps> = ({ title, img1, img2 }) => {
  return (
    <a href="#" className={styles.card}>
      <div className={styles.cardimage}>
        <Image src={img1} alt={title} width={48} height={48} />
      </div>
      <h3 className={styles.cardtitle}>{title}</h3>
    </a>
  );
};

export default Card;
