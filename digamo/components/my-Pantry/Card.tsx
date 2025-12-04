"use client";
// import React from "react";

// export default function Card() {
//   return (
//     <div className="w-full px-3 ">
//       <div className="max-w-7xl h-35 mx-auto grid grid-cols-3 gap-5 overflow-hidden">
//         <div className="bg-white items-center rounded-lg">
//           <h1 className="text-center font-bold p-4"> My Pantry Items </h1>
//         </div>
//         <div className="bg-white w-full h-full rounded-lg"> </div>
//         <div className="bg-white w-full h-full rounded-lg"> </div>
//       </div>
//     </div>
//   );
// }

// src/components/Card.tsx
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
