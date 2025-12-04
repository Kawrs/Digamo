import { Type, GenerateContentResponse } from "@google/genai"; // Added GenerateContentResponse
import { RecipeType, RecipeGenerationResponse } from '@../../types/gemini';
import { GEMINI_MODEL_TEXT_TASK } from '@../../constants';
import { getGeminiInstance } from './client';

export const generateRecipe = async (ingredients: string[], type: RecipeType): Promise<RecipeGenerationResponse> => {
  const ai = getGeminiInstance();
  const promptIngredients = ingredients.length > 0 ? `I have the following ingredients: ${ingredients.join(', ')}.` : 'I have some common pantry ingredients.';

  let prompt: string;
  if (type === RecipeType.QUICK_SNACK_MEAL) {
    prompt = `${promptIngredients} Please generate a single, quick meal or snack recipe. Provide clear instructions, ingredients list with quantities, and an estimated prep/cook time. Ensure the response is in JSON format, adhering to the RecipeGenerationResponse schema.`;
  } else if (type === RecipeType.WEEKLY_MEAL_PLAN) {
    prompt = `${promptIngredients} Please generate a 7-day (weekly) meal plan, including breakfast, lunch, and dinner recipes for each day. For each recipe, list the ingredients with quantities and clear preparation instructions. Ensure the plan primarily utilizes the provided ingredients. Summarize this plan into a JSON object matching the RecipeGenerationResponse schema where 'name' is 'Weekly Meal Plan', 'description' is a summary of the plan, 'ingredients' lists key ingredients used, and 'instructions' details the daily meals.`;
  } else {
    throw new Error('Invalid recipe type specified.');
  }

  // Define the schema for the RecipeGenerationResponse
  const recipeSchema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'The name of the recipe or meal plan.' },
      description: { type: Type.STRING, description: 'A short description of the recipe or meal plan.' },
      ingredients: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of ingredients with quantities (e.g., "2 cups flour").',
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of step-by-step instructions for preparation.',
      },
      prepTime: { type: Type.STRING, description: 'Estimated preparation time (e.g., "15 minutes").' },
      cookTime: { type: Type.STRING, description: 'Estimated cooking time (e.g., "30 minutes").' },
      servings: { type: Type.STRING, description: 'Number of servings (e.g., "4 people").' },
      nutritionInfo: {
        type: Type.OBJECT,
        properties: {
          calories: { type: Type.STRING, description: 'Calories per serving.' },
          protein: { type: Type.STRING, description: 'Protein per serving.' },
          carbs: { type: Type.STRING, description: 'Carbohydrates per serving.' },
          fat: { type: Type.STRING, description: 'Fat per serving.' },
        },
        propertyOrdering: ["calories", "protein", "carbs", "fat"],
        optional: true, // Nutrition info is optional
      },
    },
    required: ['name', 'description', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings'],
    propertyOrdering: ['name', 'description', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings', 'nutritionInfo'],
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({ // Explicitly typed response
      model: GEMINI_MODEL_TEXT_TASK,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      }
    });

    const jsonStr = response.text;
    if (jsonStr === undefined) {
      throw new Error('Model did not return text content in the expected JSON format.');
    }
    const recipeResponse: RecipeGenerationResponse = JSON.parse(jsonStr.trim());
    
    return recipeResponse;

  } catch (error) {
    console.error('Error generating recipe:', error);
    const errorMessage = `Failed to generate recipe. Please try again. ${error instanceof Error ? error.message : String(error)}`;
    throw new Error(errorMessage);
  }
};