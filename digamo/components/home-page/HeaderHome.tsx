"use client";
import { useState } from "react";
import NavButtons from "./NavButtons";
import Image from "next/image";

function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm z-50 shadow-sm dark:bg-black/50 dark:border-b dark:backdrop-blur-sm dark:shadow-sm">
      <div className="navigation flex items-center justify-between py-3 px-6 sm:px-10 lg:px-24">
        <div className="brand flex flex-row items-center space-x-3">
          <Image
            src="/chef's-head.png"
            alt="Digamo Logo"
            width={40}
            height={40}
            loading="lazy"
            className="rounded-t-lg h-10 w-full object-cover"
          />
          <h3 className="font-bold text-xl text-black font-montserrat tracking-wide dark:text-white">
            Digamo
          </h3>
        </div>

        <nav className="hidden md:flex items-center space-x-3 icons-container">
          <NavButtons />
        </nav>

        {/* profile modal here desktop */}
        <nav className="hidden md:flex relative items-center space-x-3 icons-container">
          <div className="items-center flex space-x-[-10px]">
            <button className="profile cursor-pointer">
              <div className="rounded-full bg-red p-4"></div>
            </button>

            <button
              id="multiLevelDropdownButton"
              data-dropdown-toggle="multi-dropdown"
              className="inline-flex items-center justify-center text-gray-900  box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none rounded-full"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`z-10 mt-7 absolute top-full right-0 bg-neutral-primary-medium border-1 rounded-base shadow-lg w-44 transition-all ${
              dropdownOpen ? "block" : "hidden"
            }`}
          >
            <ul>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden p-5 flex flex-col space-y-4 font-montserrat">
            <div className="flex flex-row gap-4">
              <NavButtons />
            </div>
            {/* ilisdanan pani para dynamic, profile modal sa mobile*/}
            <div className="profile mt-4">
              <div className="rounded-full bg-red p-4 w-1"></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderHome;
