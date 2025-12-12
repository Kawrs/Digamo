"use client";
import React from "react";
import HeaderHome from "components/home-page/HeaderHome";
import Card from "components/my-Pantry/Card";
import PantryInventory from "components/my-Pantry/PantryInventory";

const PantryPage: React.FC = () => {
  return (
    <div className="
      min-h-screen w-screen flex flex-col overflow-x-hidden relative 
      bg-gradient-to-l from-[#f5db83] to-[#B8D4C8]
      bg-homepage-bg bg-cover bg-center bg-no-repeat
      dark:bg-gradient-to-l dark:from-[#f5db83]/70 dark:to-[#B8D4C8]/80
    ">
      <HeaderHome />

      <div className="w-full px-6 flex justify-center mt-25">
        <div className="max-w-7xl w-full grid grid-cols-3 gap-6 mb-5">
          <Card title="7" subtitle="Total Items" description="" />
          <Card title="5" subtitle="Ingredients" description="" />
          <Card title="1" subtitle="Expiring Soon" description="" />
        </div>
      </div>

      <PantryInventory />
    </div>
  );
};

export default PantryPage;
