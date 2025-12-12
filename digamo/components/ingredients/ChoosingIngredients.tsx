"use client";
import SearchingIngredients from "components/ingredients/SearchingIngredients";
import { useEffect, useState } from "react";
import { db, auth } from "@/app/lib/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { X, Check, Loader2 } from "lucide-react";

type ChoosingIngredientsProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (ingredients: string[]) => void;
  initialSelectedNames: string[];
  children?: React.ReactNode;
  className?: string;
};

export default function ChoosingIngredients({
  isOpen,
  onClose,
  onConfirm,
  children,
  initialSelectedNames,
}: ChoosingIngredientsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 bg-transparent flex items-center justify-center z-50 backgdrop-blur-sm">
      <div
        className="absolute inset-0 backdrop-blur-sm w-full"
        onClick={onClose}
      />

      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg relative max-w-md w-full h-[60%] flex flex-col">
        <h2 className="text-2xl font-bold mb-4  dark:text-white text-gray-900">
          Choose Ingredients
        </h2>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <X size={24} />
        </button>

        <SearchingIngredients
          onCancel={onClose}
          onConfirm={(items) => {
            onConfirm(items); // Pass data up to SearchBar
            onClose();
          }}
          initialSelectedNames={initialSelectedNames}
        />
      </div>
    </div>
  );
}
