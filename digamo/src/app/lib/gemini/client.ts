import { GoogleGenAI } from "@google/genai";

export const getGeminiInstance = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY environment variable is not set.');
    // In a real application, you might throw an error or handle this more gracefully.
    // Operations will fail if the key is not set.
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};