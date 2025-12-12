"use client";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
// import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChoosingIngredients from "components/ingredients/ChoosingIngredients";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const [firstClick, setFirstClick] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [naaValue, setNaaValue] = useState(false);
  const [currentIngredients, setCurrentIngredients] = useState<string[]>([])

  //kani siya kay para inig change pages dli mawala ang sulod sa search bar after clicking the send button or pressing enter
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && inputRef.current) {
      inputRef.current.value = q;
    }
  }, [searchParams]);

   const handleSearch = () => {
    const inputValue = inputRef.current?.value ?? "";
    
    // Check if empty
    if (inputValue.trim() === "") {
      // Optional: Open modal if empty to encourage selection
      parseAndOpenModal(); 
      return;
    }

    // 🚀 Navigate to Recipe Page
    router.push(`/searchingPage?q=${encodeURIComponent(inputValue)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Safe click handling
      if (buttonRef.current) {
        buttonRef.current.click();
      }
      checkInput();
    }
  };

  const parseAndOpenModal = () => {
    if (inputRef.current) {
      const val = inputRef.current.value;
      // Split "Chicken, Rice" into ["Chicken", "Rice"]
      const parts = val.split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      
      setCurrentIngredients(parts); // Set state before reopening
      setModalOpen(true);
    }
  };

  const checkInput = () => {
    const inputValue = inputRef.current?.value ?? "";
    const isEmpty = inputValue.trim() === "";

    setNaaValue(!isEmpty);

    if (isEmpty) {
      console.log("Input is empty or whitespace.");
      return { isEmpty: true };
    }

    router.push(`/searchingPage?q=${encodeURIComponent(inputValue)}`);
    return { isEmpty: false };
  };

  const handleInputClick = () => {
    parseAndOpenModal();
  };

  const handleIngredientsSelected = (ingredients: string[]) => {
    if (inputRef.current) {
      inputRef.current.value = ingredients.join(", ");
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <ChoosingIngredients
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleIngredientsSelected}
        initialSelectedNames={currentIngredients} 
        className="inset-0 bg-opacity-50 backdrop-blur-sm w-full"
      ></ChoosingIngredients>

      <form className="max-w-md mx-auto">
        <label
          htmlFor="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Generate recipes here
        </label>
        <div className="relative">
          <input
            type="search"
            onKeyDown={handleKeyDown}
            onClick={handleInputClick}
            id="search"
            ref={inputRef}
            className="block w-full rounded-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium border-coral text-heading text-sm rounded-base focus:ring-coral shadow-xs placeholder:text-body appearance-none lg:focus:ring-1 focus:outline-none focus:border-coral"
            placeholder="Generate recipes here..."
            required
            autoComplete="off"
          />
          <button
            type="button"
            ref={buttonRef}
            onClick={handleSearch}
            className="absolute end-1.5 bottom-1.5 font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <ArrowCircleUpIcon className="focus:outline-none text-gray-600 dark:text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
