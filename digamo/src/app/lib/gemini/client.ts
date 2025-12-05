import { GoogleGenAI } from "@google/genai";

export const getGeminiInstance = () => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.error("API_KEY is not set. Please ensure it's configured in your environment.");
    throw new Error("Gemini API key is missing.");
  }
  return new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
};

export const GEMINI_MODEL = 'gemini-2.5-flash';