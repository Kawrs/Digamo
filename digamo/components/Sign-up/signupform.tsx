"use client";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const SignupForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className=" w-full md:w-3/5 rounded-2xl z-10 relative bg-white">
      <div className="flex flex-col items-center justify-center h-full w-full px-4">
        <h1 className="text-gray-900 text-3xl md:text-4xl mb-5 text-center mt-5">
          Create Account
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">Username:</h2>
            <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
              <input className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">Email:</h2>
            <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
              <input className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">Password:</h2>
            <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">Confirm Password:</h2>
            <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
          {/* Error */}
          <h2 className="text-red-500 text-md text-start ">Error Message</h2>

          {/* Button */}
          <Link rel="preload" href="/homePage">
            <button
              className="bg-[#4F4F4F] text-white rounded-2xl h-10 w-full max-w-sm shadow-2xl shadow-black-50 mb-10
                                  hover:bg-gradient-to-r hover:cursor-pointer hover:from-[#F36B3F] hover:to-[#EF4444]
                                  active:translate-y-1 transition-all"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupForm;
