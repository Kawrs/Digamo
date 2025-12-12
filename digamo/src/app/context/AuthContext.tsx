"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";
import { auth } from "../lib/firebase/firebaseConfig";
import type { User } from "firebase/auth";

const AuthContext = createContext<{
  user: User | null;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
}>({
  user: null,
  googleSignIn: async () => {},
  logOut: async () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async () => {
    console.log("=== googleSignIn START ===");
    console.log("Auth object:", auth);
    console.log("Auth current user:", auth.currentUser);

    const provider = new GoogleAuthProvider();

    // Force account selection every time
    provider.setCustomParameters({
      prompt: "select_account",
    });

    console.log("Provider created:", provider);
    console.log("About to call signInWithPopup...");

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("=== signInWithPopup SUCCESS ===");
      console.log("Result:", result);
      console.log("User:", result.user);
      console.log("User email:", result.user.email);
    } catch (error: unknown) {
      console.error("=== signInWithPopup ERROR ===");
      console.error("Error object:", error);
      console.error("Error code:", error);
      console.error("Error message:", error);

      if (error === "auth/popup-blocked") {
        throw new Error(
          "Popup was blocked. Please allow popups for this site."
        );
      }
      if (error === "auth/popup-closed-by-user") {
        throw new Error("Popup was closed before completing sign in.");
      }
      if (error === "auth/cancelled-popup-request") {
        throw new Error("Another popup is already open.");
      }
      throw error;
    }

    console.log("=== googleSignIn END ===");
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
