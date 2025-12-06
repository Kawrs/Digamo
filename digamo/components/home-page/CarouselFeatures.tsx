"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "components/home-page/SearchBar";
import { Suspense } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../src/app/lib/firebase/clientApp";
// import path from "path";

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [Display, setDisplay] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const auth = getAuth(app);

  const baseItems = [
    {
      id: 0,
      label: "Favorites",
      color: "bg-gold",
      path: "/favoriteRecipePage",
    },
    {
      id: 1,
      label: "My Pantry",
      color: "bg-orange",
      path: "/myPantry",
    },
    {
      id: 2,
      label: "Randomizer",
      color: "bg-coral",
      path: "/randomizer",
    },
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

  //username fetch from auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (users) => {
      if (users) {
        const name = users.displayName;
        console.log(name);
        setUserName(users.displayName || null);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // para sa time-dependent greeting
  useEffect(() => {
    const updateText = () => {
      const currentHour = new Date().getHours();
      let text = `Good Evening, ${userName || "Beautiful"}!`;
      if (currentHour < 12) text = `Good Morning, ${userName || "Beautiful"}!`;
      else if (currentHour < 18)
        text = `Good Afternoon, ${userName || "Beautiful"}!`;
      setDisplay(text);
    };

    updateText();
    const timer = setInterval(updateText, 60000); // update every minute
    return () => clearInterval(timer);
  }, [userName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-10">
      <div className=" absolute top-46 text-center font-quattrocento text-gray-900 dark:text-white">
        <h1 className="greetings text-4xl">{Display}</h1>
      </div>
      <div className="relative w-full flex items-center justify-center max-w-2xl mx-auto">
        <button
          onClick={prev}
          className="left absolute -left-50  z-30 p-2  rounded transition cursor-pointer"
        >
          <ChevronLeft size={32} className="text-gray-700 dark:text-white" />
        </button>

        <div className="w-100 h-70 flex items-center justify-center perspective">
          <div className="relative w-full h-full flex items-center justify-center">
            {baseItems.map((item, index) => {
              const position = getPosition(index);

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-500 ${
                    position === "center"
                      ? "z-20 scale-95 opacity-100"
                      : position === "left"
                      ? "z-10 -translate-x-56 scale-75 opacity-50"
                      : position === "right"
                      ? "z-10 translate-x-56 scale-75 opacity-50"
                      : "scale-50 opacity-0"
                  }`}
                >
                  {position === "center" ? (
                    <Link href={item.path || "/"}>
                      <div
                        className={`w-64 h-48 ${item.color} rounded-lg shadow-lg flex font-quattrocento items-center justify-center 
      cursor-pointer hover:scale-105 transition duration-200 ease-in-out`}
                      >
                        <span className="text-xl font-semibold text-dark">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`w-64 h-48 ${item.color} rounded-lg shadow-lg flex font-quattrocento items-center justify-center 
    cursor-default transition duration-200 ease-in-out`}
                    >
                      <span className="text-xl font-semibold text-dark">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="right absolute -right-50 z-30 p-2 rounded transition cursor-pointer"
        >
          <ChevronRight size={32} className="text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-1/3 mb-5 flex gap-2">
        {baseItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={`w-2 h-2 rounded-full transition ${
              current === item.id ? "bg-gray-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="mt-9 text-xl text-center sm:mt-9">
        <h1 className="font-quattrocento">Generate recipe from your pantry</h1>
      </div>
      <div className="bar absolute bottom-20 w-full px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </div>
    </div>
  );
}
