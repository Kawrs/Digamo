"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { supabase }  from '../../src/app/lib/supabase/client';

const SignupForm = () => {
    const router = useRouter();

    // Password visibility
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    // Form state
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // UI states
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [successMsg, setSuccessMsg] = React.useState("");

    // Update form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        if (!formData.email || !formData.password || !formData.username) {
            setErrorMsg("Please fill in all fields.");
            setLoading(false);
            return;
        }

        if (formData.username.length < 6) {
            setErrorMsg("Username must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: { username: formData.username },
                },
            });

            if (error) throw error;

            setSuccessMsg("Success! Account created.");

            const emailToPass = formData.email;

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            router.push(`/homePage?email=${encodeURIComponent(emailToPass)}`);

        } catch (error: unknown) {
            console.error("Signup Error:", error);

            let errorMessage = "An unexpected error occurred.";

            if (typeof error === "object" && error !== null && "message" in error) {
                const message = (error as { message: string }).message;

                if (message.includes("already exists")) {
                    errorMessage = "Account already exists! Please use the 'Log In' page.";
                } else {
                    errorMessage = message;
                }
            }

            setErrorMsg(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-3/5 rounded-2xl z-10 relative bg-white">
            <div className="flex flex-col items-center justify-center h-full w-full px-4">
                <h1 className="text-gray-900 text-3xl md:text-4xl mb-5 text-center mt-5">
                    Create Account
                </h1>

                <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSignup}>

                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-gray-500">Username:</h2>
                        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-gray-500">Email:</h2>
                        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-gray-500">Password:</h2>
                        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#F0B60E] to-[#EF4444]">
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                                >
                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
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
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="rounded-2xl w-full h-8 bg-white text-gray-900 outline-none pl-5 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                                >
                                    {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error */}
                    {errorMsg && (
                        <h2 className="text-red-500 text-sm font-semibold text-start animate-pulse">
                            {errorMsg}
                        </h2>
                    )}

                    {/* Success */}
                    {successMsg && (
                        <h2 className="text-green-500 text-sm font-semibold text-start">
                            {successMsg}
                        </h2>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#4F4F4F] text-white rounded-2xl h-10 w-full max-w-sm shadow-2xl shadow-black-50 mb-10
                                   hover:bg-gradient-to-r hover:cursor-pointer hover:from-[#F36B3F] hover:to-[#EF4444]
                                   active:translate-y-1 transition-all disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Sign Up"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SignupForm;
