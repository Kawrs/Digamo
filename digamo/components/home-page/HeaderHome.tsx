"use client";
import { useState } from "react";
import NavButtons from "./NavButtons";
import Image from "next/image";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../src/app/lib/firebase/clientApp";
import { useEffect, useRef } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";

function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (users) => {
      if (users) {
        const email = users.email;
        console.log(email);
        setUserEmail(users.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (!dropdownRef.current || !dropdownButtonRef.current) return;

      if (
        !dropdownRef.current.contains(target) &&
        !dropdownButtonRef.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleResize() {
      setDropdownOpen(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      setUserEmail(null);
      setDropdownOpen(false); // close dropdown if open
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

        <nav className="hidden md:flex items-center space-x-3 icons-container ">
          <NavButtons />
        </nav>

        {/* profile modal here desktop */}
        <nav className="hidden md:flex relative items-center space-x-3 icons-container">
          <div className="items-center flex space-x-[-10px]">
            <button
              data-dropdown-toggle="multi-dropdown"
              ref={dropdownButtonRef}
              className="inline-flex items-center justify-center group text-gray-900 gap-1 dark:text-white  box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none rounded-full"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <SettingsIcon className="text-gray-900 dark:text-white group-hover:transition-transform hover:duration-900 hover:-rotate-90 cursor-pointer" />
              <p className="hover:cursor-pointer">Settings</p>
            </button>
          </div>
        </nav>
        <div
          ref={dropdownRef}
          className={`z-10 absolute top-full right-3 items-center justify-center rounded-bl-xl rounded-br-xl dark:bg-black bg-white w-[20%] border-1 border-gold rounded-base shadow-lg p-4 transition-all ${
            dropdownOpen ? "block" : "hidden"
          }`}
        >
          <ul className=" flex flex-col space-y-4 items-start">
            <li className=" py-2 w-full justify-center flex">
              <div className="flex flex-row space-x-2">
                <EmailIcon />
                <p>{userEmail}</p>
              </div>
            </li>
            {/* <li>
              <Link href="#">
                <div className="flex px-8 flex-row space-x-2 items-center justify-center">
                  <PasswordIcon />
                  <p className="py-2 cursor-pointer rounded-full hover:underline">
                    Change Password
                  </p>
                </div>
              </Link>
            </li> */}
            <li>
              <Link href="/auth/login">
                <div className="flex px-8 flex-row space-x-2 items-center justify-center">
                  <LogoutIcon />
                  <p
                    onClick={handleLogout}
                    className=" py-2 cursor-pointer hover:underline"
                  >
                    Logout
                  </p>
                </div>
              </Link>
            </li>
          </ul>
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
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black dark:border-b-2 dark:order-white shadow-md md:hidden p-5 flex flex-col space-y-4 font-montserrat">
            <div className="w-full">
              <NavButtons />
            </div>
            {/* ilisdanan pani para dynamic, profile modal sa mobile*/}
            <ul className=" flex flex-col space-y-4 items-start">
              <li className=" py-2 px-8 justify-center flex">
                <div className="flex flex-row space-x-2">
                  <EmailIcon />
                  <p>{userEmail}</p>
                </div>
              </li>
              {/* <li>
                <Link href="#">
                  <div className="flex px-8 flex-row space-x-2 items-center justify-center">
                    <PasswordIcon />
                    <p className="py-2 cursor-pointer rounded-full hover:underline">
                      Change Password
                    </p>
                  </div>
                </Link>
              </li> */}
              <li>
                <Link href="/auth/login">
                  <div className="flex px-8 flex-row space-x-2 items-center justify-center">
                    <LogoutIcon />
                    <p
                      onClick={handleLogout}
                      className=" py-2 cursor-pointer hover:underline"
                    >
                      Logout
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderHome;
