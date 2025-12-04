"use client";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChoosingIngredients from "components/ingredients/ChoosingIngredients";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const myInput = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const [firstClick, setFirstClick] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [naaValue, setNaaValue] = useState(false);

  //kani siya kay para inig change pages dli mawala ang sulod sa search bar after clicking the send button or pressing enter
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && inputRef.current) {
      inputRef.current.value = q;
    }
  }, [searchParams]);

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current?.click();
      checkInput();
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
    const { isEmpty } = checkInput();

    if (firstClick || isEmpty) {
      //mu open ang modal if first click or input is empty
      //first click kay para ma avoid nga mag open pirmi ang modal every time i click ang input box

      //needed pasad ni nga if naa nabay na choose atleast one ingredient aron makaproceed na sa search or input
      setModalOpen(true);
      setFirstClick(false);
    }
  };

  return (
    <div>
      <ChoosingIngredients
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
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
          />
          <button
            type="button"
            // ref={buttonRef}
            onClick={checkInput}
            className="absolute end-1.5 bottom-1.5 font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <ArrowCircleUpIcon className="focus:outline-none text-gray-600 dark:text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
