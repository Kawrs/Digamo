import { Type, GenerateContentResponse } from "@google/genai";
import { PantryItem, Recipe, GeminiRecipeOutput, RecipeResponseSchema } from '../../../../types/gemini';
import { matchIngredients } from '../../myPantry/utils';
import { v4 as uuidv4 } from 'uuid';
import { getGeminiInstance, GEMINI_MODEL } from './client';

// Helper to parse Gemini's text response and apply recipe matching
const processGeminiRecipe = (geminiOutput: GeminiRecipeOutput, pantryItems: PantryItem[]): Recipe => {
  const { matchedIngredients, missingIngredients } = matchIngredients(geminiOutput.ingredients, pantryItems);

  return {
    id: uuidv4(),
    name: geminiOutput.name,
    description: geminiOutput.description,
    ingredients: geminiOutput.ingredients,
    instructions: geminiOutput.instructions,
    prepTime: geminiOutput.prepTime,
    cookTime: geminiOutput.cookTime,
    servings: geminiOutput.servings,
    matchedIngredients: matchedIngredients,
    missingIngredients: missingIngredients,
  };
};

export const generateRecipes = async (
  pantryItems: PantryItem[],
  count: number = 3
): Promise<Recipe[]> => {
  try {
    const ai = getGeminiInstance();
    const pantryList = pantryItems.map(item => `${item.name} (${item.quantity}, expires ${item.expiryDate.toLocaleDateString()})`).join(', ');

    const prompt = `
      As Digamo, an AI-powered recipe generator, create ${count} unique, practical, and family-friendly recipes.
      Prioritize using ingredients from the user's pantry, especially those expiring soon.
      For each recipe, ensure specific measurements are provided and keep prep/cook times realistic (15-45 minutes).
      Output the recipes in a JSON array format as defined by the RecipeResponseSchema.
      DO NOT include nutrition information.

      User's Pantry: ${pantryList}
      Dietary restrictions/preferences: None specified.
      `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: RecipeResponseSchema.parameters,
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini API returned no text response for recipes.");
    }
    const geminiRecipes: GeminiRecipeOutput[] = JSON.parse(text);
    return geminiRecipes.map(gr => processGeminiRecipe(gr, pantryItems));

  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};

export const customizeRecipe = async (
  originalRecipe: Recipe,
  customizationPrompt: string,
  pantryItems: PantryItem[]
): Promise<Recipe> => {
  try {
    const ai = getGeminiInstance();
    const pantryList = pantryItems.map(item => `${item.name} (${item.quantity})`).join(', ');

    const prompt = `
      As Digamo, an AI-powered recipe customizer, modify the following recipe based on the user's request.
      Keep the essence of the original recipe, but make reasonable adjustments.
      Ensure the output is in the JSON format as defined by the RecipeResponseSchema.
      DO NOT include nutrition information.

      Original Recipe:
      Name: ${originalRecipe.name}
      Ingredients: ${originalRecipe.ingredients.join(', ')}
      Instructions: ${originalRecipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}
      Prep Time: ${originalRecipe.prepTime}
      Cook Time: ${originalRecipe.cookTime}
      Servings: ${originalRecipe.servings}

      User's Pantry (for context): ${pantryList}

      Customization Request: "${customizationPrompt}"
      `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: RecipeResponseSchema.parameters,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini API returned no text response for customized recipe.");
    }
    const geminiOutput: GeminiRecipeOutput = JSON.parse(text);
    return processGeminiRecipe(geminiOutput, pantryItems);

  } catch (error) {
    console.error("Error customizing recipe:", error);
    throw error;
  }
};

export const generateFilipinoRecipes = async (): Promise<Recipe[]> => {
  try {
    const ai = getGeminiInstance();

    const prompt = `
      As Digamo's "Surprise Me!" feature, generate FOUR unique Filipino recipes, unexpected, and catchy
      Provide a unique, practical, and family-friendly recipe.
      Start with a catchy meal name and a 2-3 sentence description explaining why it's awesome,
      then follow with the full recipe in JSON format as defined by the RecipeResponseSchema.
      DO NOT include nutrition information.
      Each recipe must follow this structure (JSON only, no extra text):
      {
        "name": "",
        "description": "",
        "cookTime": number,
        "ingredients": [""],
        "instructions": [""],
      }
      Return an ARRAY of 4 such objects. No markdown. No explanations. JSON only.
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: { responseMimeType: "text/plain" },
    });

    const text = response.text ?? "";

    // Extract JSON
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1)
      throw new Error("Failed to extract recipe array JSON from Gemini");

    const jsonString = text.substring(jsonStart, jsonEnd + 1);

    const recipes: Recipe[] = JSON.parse(jsonString);
    return recipes;

  } catch (err) {
    console.error("Error generating Filipino recipes:", err);
    throw err;
  }
};
