"use client";
import React from "react";
import HeaderHome from "components/home-page/HeaderHome";
import Card from "components/randomizer-page/Card";

import { Shuffle } from "lucide-react";

export default function Randomizer() {
  return (
    <div className="w-full min-h-screen bg-[#FCEFC8]">
      <HeaderHome />
      <div className="w-full flex justify-center font-quattrocento ">
        <p className="mt-30 text-5xl text-black">Recipe Randomizer</p>
      </div>
      <div className="w-full flex justify-center ">
        <button className="animate-pulse hover:scale-110 transition-transform duration-200 active:scale-95">
          <Shuffle size={95} className="mt-10 hover:cursor-pointer" />
          {/* wala pa na added here ang functionality sa button nga mu shuffle kay sa AI nana nga part */}
        </button>
      </div>
      <div className="w-full flex justify-center font-quattrocento ">
        <p className="mt-5 text-xl text-black">
          Press shuffle button to randomize recipes.
        </p>
      </div>
      <Card />
    </div>
  );
}
