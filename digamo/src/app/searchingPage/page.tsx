"use client";

import HeaderHome from "components/home-page/HeaderHome";
import SearchBar from "components/home-page/SearchBar";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { generateRecipesFromIngredients } from "@/app/lib/gemini/recipes";
import { Clock, Users, ChevronRight } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Gets "Chicken, Rice"

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchRecipes = async () => {
      setLoading(true);
      setHasSearched(true);

      // Convert string to array
      const ingredientsArray = query.split(",").map((s) => s.trim());

      const results = await generateRecipesFromIngredients(ingredientsArray);
      setRecipes(results);
      setLoading(false);
    };

    fetchRecipes();
  }, [query]);

  // --- UI STATES ---

  if (!query && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <p className="text-xl">Add ingredients to start cooking!</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-coral"></div>
        <p className="font-quattrocento text-lg animate-pulse">
          Digamo is creating recipes for:{" "}
          <span className="font-bold">{query}</span>...
        </p>
      </div>
    );
  }

  if (hasSearched && recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <p>No recipes found. Try adding more common ingredients.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-32 pt-28">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Header */}
          <div className="bg-coral/5 p-6 border-b border-coral/10">
            <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
            <p className="text-gray-600 mt-2 line-clamp-2">
              {recipe.description}
            </p>

            <div className="flex gap-4 mt-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-coral" />
                {recipe.prepTime} prep
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-coral" />
                {recipe.cookTime} cook
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} className="text-coral" />
                {recipe.servings} servings
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-3">You Have / Need:</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {/* Matched */}
              {recipe.matchedIngredients.map((ing, i) => (
                <span
                  key={`m-${i}`}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  ✓ {ing}
                </span>
              ))}
              {/* Missing */}
              {recipe.missingIngredients.map((ing, i) => (
                <span
                  key={`mis-${i}`}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                >
                  + {ing}
                </span>
              ))}
            </div>

            {/* Expandable Instructions (Optional, simple list for now) */}
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-coral font-bold list-none">
                <ChevronRight className="group-open:rotate-90 transition-transform" />
                View Instructions
              </summary>
              <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
                {recipe.instructions.map((step, i) => (
                  <p key={i} className="text-gray-700">
                    <span className="font-bold text-gray-400 mr-2">
                      {i + 1}.
                    </span>
                    {step}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchingPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen p-2 justify-center items-center">
      <HeaderHome />

      <div className="container">
        <div className="flex-1 w-full px-4 overflow-y-auto">
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchResults />
          </Suspense>
        </div>
      </div>

      <div className="container-answer h-screen w-screen"></div>
      <div className="fixed bottom-20 w-full p-2">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </div>
    </div>
  );
}
