import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const baseItems = [
    { id: 0, label: "Favorites", color: "bg-gray" },
    { id: 1, label: "My Pantry", color: "bg-gray" },
    { id: 2, label: "Randomizer", color: "bg-gray" },
  ];

  const next = () => {
    setCurrent((current + 1) % baseItems.length);
  };

  const prev = () => {
    setCurrent((current - 1 + baseItems.length) % baseItems.length);
  };

  const getPosition = (index: number) => {
    const diff = (index - current + baseItems.length) % baseItems.length;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === baseItems.length - 1) return "left";
    return "hidden";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-46 text-center text-4xl">
        <h1>Good Morning, Beautiful!</h1>
      </div>
      <div className="relative w-full flex items-center justify-center max-w-2xl mx-auto">
        <button
          onClick={prev}
          className="absolute -left-12 z-30 p-2  rounded transition cursor-pointer"
        >
          <ChevronLeft size={32} className="text-gray-700" />
        </button>

        <div className="w-96 h-64 flex items-center justify-center perspective">
          <div className="relative w-full h-full flex items-center justify-center">
            {baseItems.map((item, index) => {
              const position = getPosition(index);

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-500 ${
                    position === "center"
                      ? "z-20 scale-100 opacity-100"
                      : position === "left"
                      ? "z-10 -translate-x-56 scale-75 opacity-60"
                      : position === "right"
                      ? "z-10 translate-x-56 scale-75 opacity-60"
                      : "scale-50 opacity-0"
                  }`}
                >
                  <div
                    className={`w-64 h-48 ${item.color} rounded-lg shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-2xl font-semibold text-white">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute -right-12 z-30 p-2 rounded transition cursor-pointer"
        >
          <ChevronRight size={32} className="text-gray-700" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-1/3 flex gap-2">
        {baseItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={`w-2 h-2 rounded-full transition ${
              current === item.id ? "bg-gray-700" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
