"use client";
import { useState } from "react";
import Link from "next/link";



function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm z-50 shadow-sm dark:bg-black/50 dark:border-b dark:backdrop-blur-sm dark:shadow-sm">
      <div className="navigation flex items-center justify-between py-3 px-6 sm:px-10 lg:px-24">
        <h3 className="font-bold text-xl text-black font-montserrat tracking-wide dark:text-white">
          Digamo
        </h3>

        <nav className="hidden md:flex flex-1 justify-center ">
          <ul className="flex space-x-8 font-medium font-montserrat text-gray-900 ">
            <li>
              <a
                href="#hero"
                className="relative text-gray-800 font-medium  transition-colors duration-300 
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:translate-y-0.5
             after:bg-red after:transition-all after:duration-300 hover:after:w-full dark:text-white dark:after:bg-orange"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="relative text-gray-800 font-medium  transition-colors duration-300 
             after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:translate-y-0.5
             after:bg-red after:transition-all after:duration-300 hover:after:w-full dark:text-white dark:after:bg-orange "
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#steps"
                className="relative text-gray-800 font-medium  transition-colors duration-300 
             after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:translate-y-0.5
             after:bg-red after:transition-all after:duration-300 hover:after:w-full dark:text-white dark:after:bg-orange"
              >
                Usage
              </a>
            </li>
            <li>
              <a
                href="#samples"
                className="relative text-gray-800 font-medium  transition-colors duration-300 
             after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:translate-y-0.5
             after:bg-red after:transition-all after:duration-300 hover:after:w-full dark:text-white dark:after:bg-orange"
              >
                Samples
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Link href="/auth/login">
            <button className="py-2.5 px-8 text-sm font-semibold text-gray-700 font-montserrat hover:bg-mint/80 hover:text-white transition-colors rounded-lg tracking-wide cursor-pointer dark:text-white">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
          <button className="py-2.5 px-6 text-sm font-semibold bg-orange text-white font-montserrat border border-gray-200 hover:bg-coral transition-colors rounded-lg tracking-wide cursor-pointer shadow-md hover:shadow-lg">
            Register
          </button>
          </Link>
        </div>

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
            <a href="#hero" className="hover:text-orange transition-colors">
              Home
            </a>
            <a href="#features" className="hover:text-orange transition-colors">
              Features
            </a>
            <a href="#steps" className="hover:text-orange transition-colors">
              Usage
            </a>
            <a href="#samples" className="hover:text-orange transition-colors">
              Samples
            </a>
            <div className="flex flex-col space-y-3 mt-4">
              
               
               <button className="py-2.5 px-8 text-sm font-semibold text-gray-700 font-montserrat hover:bg-mint/80 hover:text-white transition-colors rounded-lg tracking-wide cursor-pointer">
               Login
              </button>
              <Link href="/auth/signup">
              <button className="py-2.5 px-6 text-sm font-semibold bg-orange text-white font-montserrat hover:bg-coral transition-colors rounded-lg tracking-wide cursor-pointer  hover:shadow-lg">
                Register
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
