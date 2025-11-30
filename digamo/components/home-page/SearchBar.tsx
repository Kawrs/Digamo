"use client";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Link from "next/link";
import React, { use, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const myInput = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    router.push("/searchingPage");
  };

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

    if (inputValue.trim() === "") {
      console.log("Input is empty or whitespace.");
      return;
    }

    handleButtonClick();
  };
  return (
    <div>
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
