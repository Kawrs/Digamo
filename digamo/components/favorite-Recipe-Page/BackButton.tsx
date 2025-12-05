"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

const BackButton = () => {
  return (
    <div className="fixed top-25 left-25 z-50">
      <Link href="/homePage">
        <button
          className="group flex items-stretch rounded-2xl overflow-hidden shadow-lg 
      bg-white/50 gap-1 hover:cursor-pointer hover:shadow-xl active:translate-y-1 transition-all duration-200
      hover:scale-105 backdrop-blur-xl"
        >
          {/* Arrow section */}
          <div className="flex items-center justify-center bg-[#B8D4C8]/10 px-3 backdrop-blur-xl">
            <FaArrowLeftLong className="dark:text-black" />
          </div>

          {/* Text section with gap */}
          <div className="flex items-center bg-gradient-to-l from-[#F0B60E]/10 to-[#B8D4C8]/30 px-4 backdrop-blur-xl">
            <h2 className="font-extralight text-sm dark:text-black">
              Back to search
            </h2>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
