"use client";
import React, { useState } from "react";
import HeaderHome from "components/home-page/HeaderHome";
import Card from "components/randomizer-page/Card";
import { Shuffle } from "lucide-react";
import { generateFilipinoRecipes } from "../lib/gemini/recipes";
import { Recipe } from "types/gemini";

export default function Randomizer() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleShuffle = async () => {
    try {
      setLoading(true);
      setRecipes([]); 
      
      const result = await generateFilipinoRecipes();
      
      // Safety check: only update if we actually got data
      if (result && result.length > 0) {
        setRecipes(result);
      } else {
        console.warn("No recipes returned");
        // Optional: Show a toast error here
      }
    } catch (error) {
      console.error("Shuffle failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FCEFC8]">
      <HeaderHome />

      <div className="w-full flex justify-center font-quattrocento">
        <p className="mt-30 text-5xl text-black">Recipe Randomizer</p>
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={handleShuffle}
          disabled={loading}
          className={"animate-pulse hover:scale-110 transition-transform duration-200 active:scale-95"}
        >
          <Shuffle size={95} className="mt-10 hover:cursor-pointer" />
        </button>
      </div>

      <div className="w-full flex justify-center font-quattrocento">
        <p className="mt-5 text-xl text-black">
          {loading ? "Generating recipes..." : "Press shuffle to randomize recipes."}
        </p>
      </div>

      <div className="flex flex-col items-center mt-10 gap-4 pb-20 px-4">
        {recipes.map((recipe, index) => (
          <Card
            key={index}
            name={recipe.name}
            cookTime={recipe.cookTime}
            description={recipe.description}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />
        ))}
      </div>
    </div>
  );
}