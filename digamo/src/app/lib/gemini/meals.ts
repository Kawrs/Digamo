import { GenerateContentResponse } from "@google/genai";
import { PantryItem, Recipe, GeminiGroceryListOutput, GroceryListResponseSchema } from "@../../types/gemini";
import { getGeminiInstance, GEMINI_MODEL } from './client'; 

export const generateGroceryList = async (
  mealPlanRecipes: Recipe[],
  pantryItems: PantryItem[],
  userLocation: { latitude: number; longitude: number } | null
): Promise<GeminiGroceryListOutput> => {
  try {
    const ai = getGeminiInstance();
    const currentPantryNames = pantryItems.map(item => item.name.toLowerCase());
    const allIngredientsNeeded: { [key: string]: string } = {}; // Ingredient name to original string

    mealPlanRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // Simple check: if ingredient (or a key part of it) is NOT in pantry
        const isAlreadyInPantry = currentPantryNames.some(pantryName =>
          ingredient.toLowerCase().includes(pantryName) || pantryName.includes(ingredient.toLowerCase().split('(')[0].trim())
        );

        if (!isAlreadyInPantry) {
          // If not in pantry, add to the list of needed items
          allIngredientsNeeded[ingredient.toLowerCase()] = ingredient;
        }
      });
    });

    const neededItemsList = Object.values(allIngredientsNeeded).join(', ');

    const locationContext = userLocation
      ? `User's current location: Latitude ${userLocation.latitude}, Longitude ${userLocation.longitude}.`
      : `User's location is not available. Suggest general store types.`;

    const prompt = `
      As Digamo's "Smart Grocery List" generator, create a comprehensive and organized shopping list.
      ONLY include items that are NOT in the user's pantry and are needed for the planned meals.
      Be specific with quantities based on servings from the recipes.
      Group similar items by category (e.g., Produce, Meat & Seafood, Dairy, Pantry).
      Suggest 3-4 appropriate store types (e.g., "Supermarket - for meat, dairy, and produce", "Mexican grocery - for authentic taco shells").
      Use the provided user location to recommend stores if available.

      Ingredients needed for planned meals: ${neededItemsList || 'No additional ingredients needed.'}
      Current Pantry Items (DO NOT include these in the list): ${currentPantryNames.join(', ') || 'Pantry is empty.'}
      ${locationContext}

      Output the grocery list in JSON format as defined by the GroceryListResponseSchema.
      `;

    if (!neededItemsList) {
      return {
        items: [],
        categories: {},
        stores: ["Great news! You have all the ingredients for your planned meals in your pantry."],
      };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: GroceryListResponseSchema.parameters,
        toolConfig: userLocation ? {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            }
          }
        } : undefined,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini API returned no text response for grocery list.");
    }
    const geminiGroceryList: GeminiGroceryListOutput = JSON.parse(text);
    return geminiGroceryList;

  } catch (error) {
    console.error("Error generating grocery list:", error);
    // Return a default empty list in case of error
    return {
      items: [],
      categories: {},
      stores: ["Could not generate grocery list. Please try again."],
    };
  }
};