"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface RecipeCard {
  name: string;
  duration: number;
  description: string;
  ingredients?: string[];
  instructions?: string[];                                                                
}

export default function Card({ name, duration, description, ingredients, instructions }: RecipeCard) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-full px-6 py-4 cursor-pointer border-4 border-transparent shadow-md hover:shadow-lg hover:scale-[1.02]"
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium text-lg">{name}</span>
          <span className="text-gray-600 font-medium">{duration} mins</span>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-black font-semibold mb-4">{duration} mins</p>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{ingredients?.join(", ")}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{instructions?.join(" ")}</p>
          </div>
        </div>
      )}
    </>
  );
}
