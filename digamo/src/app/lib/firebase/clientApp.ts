import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
