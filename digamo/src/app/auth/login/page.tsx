"use client";
import React from "react";

import Scene from "components/landing-page/Scene";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Script from "next/script";

// import Link from "next/link";

export default function login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="bg-white w-full min-h-screen h-full py-15 px-5">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QMVC5BR2W3"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
      
                gtag("config", "G-QMVC5BR2W3");`}
      </Script>
      <div className=" h-full w-4/5 flex m-auto rounded-2xl shadow-2xl">
        {/* left side*/}
        <div className="h-full w-2/5 bg-gradient-to-tl from-[#F0B60E] to-[#B8D4C8] rounded-l-2xl z-0 relative -mr-5 overflow-hidden flex flex-col">
          <div className="flex-shrink-0 pt-8 px-6 text-center">
            <h1 className="text-gray-900 text-4xl font-bold">Welcome!</h1>
            <h6 className="text-[#F36B3F] text-base mt-2 leading-snug">
              Add Your Pantry. Get a Recipe. Start Cooking.
            </h6>
          </div>
          <div className="flex-1 flex items-center justify-start overflow-hidden px-4 -ml-12">
            <div className="w-full max-w-xs">
              <Scene />
            </div>
          </div>
        </div>

        {/* right side*/}
        <div className=" h-full w-1/2 rounded-2xl z-10 relative bg-white">
          <div className="flex flex-col items-center h-full w-full mt-7 ">
            <h1 className="text-gray-900 text-4xl relative left-13 mb-5">
              Sign in
            </h1>

            <div className="flex flex-col gap-4 relative left-15">
              <div className="flex flex-col gap-1">
                <h2 className="text-gray-500">Username:</h2>
                <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444] justify-center items-center">
                  <input className="rounded-2xl w-90 h-8 bg-white text-gray-900 outline-none pl-5"></input>
                </div>
              </div>

              {/* Password input*/}
              <div className="flex flex-col gap-1 relative">
                <h2 className="text-gray-500">Password:</h2>
                <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="rounded-2xl w-90 h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 hover:cursor-pointer
                                  transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-red-500 text-md m-2 -ml-20">Error Message</h2>
            <button
              className="bg-[#4F4F4F] text-white rounded-[30px] relative left-15 h-10 w-90 hover:cursor-pointer hover:bg-[#0e100f]
                        active:translate-y-1 transition-ease-out duration-100"
            >
              Sign In
            </button>
            <div>
              <Script
                src="https://accounts.google.com/gsi/client"
                strategy="lazyOnload"
              />
              <button
                type="button"
                className="flex items-center justify-center ml-30  h-10 w-90 bg-white border border-gray-300 rounded-[30px] shadow hover:bg-gray-100 transition-colors duration-200 text-[#223F61] font-medium cursor-pointer mt-2"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-8"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 relative ml-25 mt-4">
              <p className="text-[#223F61] text-sm font-medium">
                Don't have an account?
              </p>
              <Link
                href="/auth/signup"
                className="text-[#223F61] text-sm font-medium cursor-pointer hover:underline ml-30"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
