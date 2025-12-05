"use client";

import React from "react";
import { CardProps } from "./Card.types";
import styles from "./Card.module.css";

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  children,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm w-full">
      {imageUrl && (
        <img src={imageUrl} alt={title} className={styles.cardImage} />
      )}
      <div className="flex flex-col">
        {subtitle && (
          <p className="text-gray-500 text-sm font-medium mb-2">{subtitle}</p>
        )}
        <h2 className="text-5xl font-bold text-orange-500 mb-2">{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
