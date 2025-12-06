"use client";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white dark:bg-black w-full min-h-screen py-8 md:py-20 flex items-center justify-center ">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QMVC5BR2W3"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "G-QMVC5BR2W3");`}
      </Script>

      <div className="h-full w-11/12 md:w-4/5 flex flex-col md:flex-row m-auto rounded-2xl overflow-hidden border-1 border-gray-300 items-center shadow-lg">
        {/* Left side - Hidden on mobile */}
        <div className="hidden md:flex h-full md:w-2/5 bg-gradient-to-tl from-[#F0B60E] to-[#B8D4C8] rounded-l-2xl z-0 relative -mr-5 overflow-hidden flex-col">
          <div className="flex-shrink-0 pt-8 px-8 text-center">
            <h1 className="text-gray text-4xl font-montagu font-bold">
              Welcome!
            </h1>
            <h6 className="text-[#F36B3F] text-xl font-montserrat">
              Add Your Pantry. Get a Recipe. Start Cooking.
            </h6>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Image
              src="/chef's-head.png"
              alt="Digamo Logo"
              width={700}
              height={670}
              loading="lazy"
              className="h-90 w-80"
            />
          </div>
        </div>

        {/* Right side - Full width on mobile */}
        <div className="h-full w-full md:w-1/2 rounded-2xl md:rounded-l-none relative  py-8 md:py-0">
          {/* Mobile header - Only shown on mobile */}
          <div className="md:hidden text-center mb-8 px-6">
            <h1 className="text-[#4F4F4F] text-4xl font-montagu font-bold">
              Welcome!
            </h1>
            <h2 className="text-[#F36B3F] text-xl font-montagu">
              Add Your Pantry. Get a Recipe. Start Cooking.
            </h2>
          </div>

          <div className="flex flex-col items-center h-full w-full justify-center px-6 md:px-0">
            <h1 className="text-gray-900 dark:text-white text-4xl md:text-3xl mb-5 text-center md:text-left md:relative md:left-15">
              Sign in
            </h1>

            <div className="flex flex-col gap-4 w-full  max-w-sm md:relative md:left-15">
              <div className="flex flex-col gap-1">
                <h2 className="text-gray-500 dark:text-white ">Email:</h2>
                <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444] justify-center items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl w-full h-10 md:h-8 bg-white text-gray-900 outline-none pl-5"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="flex flex-col gap-1 relative">
                <h2 className="text-gray-500 dark:text-white ">Password:</h2>
                <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-2xl w-full h-10 md:h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 hover:cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {errorMsg && (
              <h2 className="text-red-500 text-sm md:text-md m-2 md:-ml-20 text-center md:text-left">
                {errorMsg}
              </h2>
            )}

            <button
              onClick={async () => {
                setErrorMsg("");
                if (!email || !password) {
                  setErrorMsg("Please fill in email and password.");
                  return;
                }
                try {
                  if (!auth) {
                    setErrorMsg(
                      "Firebase is not initialized. Please check your configuration."
                    );
                    return;
                  }
                  setLoading(true);
                  await signInWithEmailAndPassword(auth, email, password);
                  router.push("/homePage");
                } catch (error: unknown) {
                  console.error("Login error", error);
                  let message = "Failed to sign in.";
                  if (typeof error === "object" && error && "code" in error) {
                    const code = (error as { code: string; message?: string })
                      .code;
                    switch (code) {
                      case "auth/invalid-email":
                        message = "Invalid email address.";
                        break;
                      case "auth/user-not-found":
                      case "auth/wrong-password":
                        message = "Invalid email or password.";
                        break;
                      case "auth/too-many-requests":
                        message = "Too many attempts. Try again later.";
                        break;
                      default:
                        message =
                          (error as { message?: string }).message || message;
                    }
                  }
                  setErrorMsg(message);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="bg-[#4F4F4F] text-white dark:text-gray-900 rounded-[30px] h-10 w-full max-w-sm md:w-90 md:relative md:left-15 hover:cursor-pointer hover:bg-[#0e100f] dark:hover:bg-coral dark:hover:text-white dark:bg-white active:translate-y-1 transition-ease-out duration-100 disabled:opacity-60 mt-4"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="w-full max-w-sm md:w-90 md:relative md:left-15">
              <Script
                src="https://accounts.google.com/gsi/client"
                strategy="lazyOnload"
              />
              <button
                type="button"
                className="flex items-center justify-center w-full h-10 bg-white border border-gray-300 rounded-[30px] shadow hover:bg-gray-100 transition-colors duration-200 text-[#223F61] font-medium cursor-pointer mt-2"
              >
                <Image
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-3"
                  unoptimized
                />
                <span className="text-sm md:text-base">
                  Sign in with Google
                </span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 md:relative md:ml-25 mt-4">
              <p className="text-[#223F61] text-sm font-medium md:mr-30 dark:text-white">
                Don&apos;t have an account?
              </p>
              <Link
                href="/auth/signup"
                className="text-[#223F61] dark:text-white text-sm font-medium cursor-pointer hover:underline md:ml-5"
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
