import React, { useState } from "react";
import { X } from "lucide-react";

export default function PopupCard() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      name: "Lorem Ipsum Salad",
      calories: 450,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
    },
    {
      id: 2,
      name: "Lorem Ipsum Carbonara",
      calories: 680,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
    },
    {
      id: 3,
      name: "Vegetable Lorem Ipsum",
      calories: 320,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
    },
    {
      id: 4,
      name: "Lorem Ipsum",
      calories: 520,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
    },
  ];

  return (
    <div className="min-h-screen  flex  justify-center mt-10">
      <div className="max-w-2xl w-full space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={`bg-white rounded-full px-6 py-4 cursor-pointer transition-all duration-200 ${
              selectedItem === item.id
                ? "border-1 border-amber-400 shadow-lg hover: cursor-pointer"
                : "border-4 border-transparent shadow-md hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium text-lg">
                {item.name}
              </span>
              <span className="text-gray-600 font-medium">
                {item.calories} calories
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedItem !== null && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Popup Content */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {items.find((item) => item.id === selectedItem)?.name}
              </h2>
              <p className="text-black font-semibold mb-4">
                {items.find((item) => item.id === selectedItem)?.calories}{" "}
                calories
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {items.find((item) => item.id === selectedItem)?.description}
              </p>
            </div>
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
    </div>
  );
}
