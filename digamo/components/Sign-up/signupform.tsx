"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { supabase }  from '../../src/app/lib/supabase/client';
import { auth, db } from "../../src/app/lib/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
 
interface SignupFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm = () => {
    const router = useRouter();

    // Password visibility
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    // Form state
    const [formData, setFormData] = React.useState<SignupFormData>({
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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value } as SignupFormData));
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

        if (formData.password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            // Step 1: Create user
            const result = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = result.user;

            // Step 2: Update display name
            await updateProfile(user, {
                displayName: `${formData.username}`,
            });

            // Step 3: Create user document in Firestore
            try {
                await setDoc(doc(db, "users", user.uid), {
                    username: formData.username,
                    email: formData.email,
                    uid: user.uid,
                    createdAt: new Date().toISOString(),
                });
            } catch (firestoreError: unknown) {
                // If Firestore fails due to permissions, provide helpful message
                const error = firestoreError as { code?: string; message?: string };
                if (error?.code === 'permission-denied' || 
                    error?.message?.includes('permission') ||
                    error?.message?.includes('Permission')) {
                    throw new Error('Firestore permission denied. Please update your Firestore security rules to allow authenticated users to create documents in the "users" collection.');
                }
                // Re-throw other Firestore errors
                throw firestoreError;
            }

            setSuccessMsg("Success! Account created.");
            
            // Clear form
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            router.push("/dashboard");
        } catch (err: unknown) {
            let errorMessage = "An unexpected error occurred.";
            
            // Type guard for Firebase errors
            const error = err as { code?: string; message?: string };
            
            if (error?.code) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "Account already exists! Please use the 'Log In' page.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email address.";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password should be at least 6 characters.";
                        break;
                    case "permission-denied":
                        errorMessage = "Permission denied. Please update Firestore security rules to allow users to create their profile.";
                        break;
                    default:
                        errorMessage = error.message || errorMessage;
                }
            } else if (error?.message) {
                errorMessage = error.message;
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
                                required
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
                                required
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
                                    required
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
                                    required
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
