"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface RecipeCard {
  name: string;
  cookTime: number | string; // handles string or number just in case
  description: string;
  ingredients?: string[];
  instructions?: string[];
}

export default function Card({
  name,
  cookTime,
  description,
  ingredients,
  instructions,
}: RecipeCard) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`
          max-w-2xl w-full bg-white rounded-full px-6 py-4 cursor-pointer 
          transition-all duration-200 
          ${open 
            ? "border-1 border-amber-400 shadow-lg hover:cursor-pointer" 
            : "border-4 border-transparent shadow-md hover:shadow-lg hover:scale-[1.02]"
          }
        `}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium text-lg">{name}</span>
          <span className="text-gray-600 font-medium">{cookTime} mins</span>
        </div>
      </div>

      {/* Popup Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative animate-scaleIn max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Popup Content */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-amber-600 font-semibold mb-4">{cookTime} mins</p>
            
            <p className="text-gray-600 leading-relaxed mb-6 italic">
              {description}
            </p>

            {/* Ingredients Section */}
            {ingredients && ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions Section */}
            {instructions && instructions.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Instructions</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  {instructions.map((step, i) => (
                    <li key={i} className="pl-1 marker:font-bold">{step.replace(/^(\d+\.|Step \d+[:.]?)\s*/i, "")}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      
      

      <style jsx>{`
        @keyframes fadeIn {
          from {
           opacity: 0; 
          }
          to {
           opacity: 1; 
           }
        }
        
        @keyframes scaleIn {
          from {
           transform: scale(0.9); 
           opacity: 0; 
           }
          to {
           transform: scale(1);
            opacity: 1; 
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}