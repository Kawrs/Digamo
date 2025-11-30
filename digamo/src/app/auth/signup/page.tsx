"use client";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="bg-white w-full min-h-screen h-full py-15 px-5">
      <div className=" h-full w-4/5 flex m-auto rounded-2xl shadow-2xl">
        {/* left side*/}
        <div className=" h-full w-2/5 bg-gradient-to-tl from-[#F0B60E] to-[#B8D4C8] rounded-l-2xl z-0 relative -mr-5">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div>
              <h1 className="text-gray-900 text-4xl">Welcome!</h1>
              <h2 className="text-[#F36B3F] text-xl">To Digamo Fellow chefs</h2>
              <h2 className="text-[#F36B3F] text-xl">Chefs</h2>
              <img className="bg-gray-900 w-45 h-45 m-5"></img>
              <button
                className="bg-[#EF4444] border-2 border-[#EF4444] text-white rounded-2xl h-8 w-50 mt-5 
                      hover:cursor-pointer hover:bg-white hover:text-gray-900 hover:border-[#F0B60E]
                      active:translate-y-1 transition-all duration-200"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* right side*/}
        <div className=" h-full w-1/2 rounded-2xl z-10 relative bg-white">
          <div className="flex flex-col items-center h-full w-full mt-7 ">
            <h1 className="text-gray-900 text-4xl relative left-13 mb-5">
              Create Account
            </h1>

            <div className="flex flex-col gap-4 relative left-15">
              <div className="flex flex-col gap-1">
                <h2 className="text-gray-500">Username:</h2>
                <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444] justify-center items-center">
                  <input className="rounded-2xl w-90 h-8 bg-white text-gray-900 outline-none pl-5"></input>
                </div>
              </div>
              <div className="flex flex-col gap-1 relative">
                <h2 className="text-gray-500">Email:</h2>
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
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password input */}
              <div className="flex flex-col gap-1 relative">
                <h2 className="text-gray-500">Confirm Password:</h2>
                <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="rounded-2xl w-90 h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 hover:cursor-pointer
                          transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-red-500 text-md m-2 -ml-20">Error Message</h2>
            <button
              className="bg-[#4F4F4F] text-white rounded-2xl relative left-15 h-8 w-90 hover:cursor-pointer hover:bg-[#EF4444]
                      active:translate-y-1 transition-ease-out duration-100"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
