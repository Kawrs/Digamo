"use client";
import SearchingIngredients from "components/ingredients/SearchingIngredients";
import { useState } from "react";

type ChoosingIngredientsProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function ChoosingIngredients({
  isOpen,
  onClose,
  children,
}: ChoosingIngredientsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backgdrop-blur-sm">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm w-[70%]"
        onClick={onClose}
      />
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Choose Ingredients
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
        {/* dri nga dapit kay for the searcbar */}
        <SearchingIngredients
          onChoose={(value) => {
            if (value === "cancel") onClose();
          }}
        />
      </div>
    </div>
  );
}
