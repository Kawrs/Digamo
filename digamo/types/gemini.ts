import { FunctionDeclaration, Type } from "@google/genai";

// Enums
export enum ExpiryStatus {
  FRESH = 'fresh',
  USE_SOON = 'use_soon',
  EXPIRING_SOON = 'expiring_soon',
  EXPIRED = 'expired',
}

export enum PantryCategory {
  INGREDIENT = 'ingredient',
  CONDIMENT = 'condiment',
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

// Interfaces for Data Structures
export interface PantryItem {
  id: string;
  name: string;
  quantity: string; // e.g., "500g", "2 cups", "6 pieces"
  expiryDate: Date;
  category: PantryCategory;
  expiryStatus: ExpiryStatus; // Derived property
}

// Removed RecipeNutritionInfo interface as per request.

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[]; // e.g., "2 chicken breasts, diced"
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  matchedIngredients: string[]; // Subset of `ingredients` that user has
  missingIngredients: string[]; // Subset of `ingredients` that user needs
  // Removed nutritionInfo: RecipeNutritionInfo;
}

export interface MealPlan {
  id: string;
  date: Date;
  mealType: MealType;
  recipe: Recipe;
}

// Gemini API related types
export interface GeminiRecipeOutput {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  // Removed nutritionInfo: RecipeNutritionInfo;
}

export interface GeminiGroceryListOutput {
  items: string[];
  categories: {
    Produce?: string[];
    'Meat & Seafood'?: string[];
    Dairy?: string[];
    Pantry?: string[];
  };
  stores: string[];
}

export const RecipeResponseSchema: FunctionDeclaration = {
  name: 'RecipeResponse',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'Clear, appetizing recipe name' },
      description: { type: Type.STRING, description: 'Brief 1-2 sentence description' },
      ingredients: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'List of ingredients with specific measurements (e.g., "2 chicken breasts, diced")'
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Numbered step-by-step instructions with specific details, timing, and temperatures'
      },
      prepTime: { type: Type.STRING, description: 'Realistic preparation time (e.g., "15 minutes")' },
      cookTime: { type: Type.STRING, description: 'Realistic cooking time (e.g., "20 minutes")' },
      servings: { type: Type.NUMBER, description: 'Number of servings (e.g., 4)' },
      // Removed nutritionInfo property
    },
    required: ['name', 'description', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings'] // Removed nutritionInfo from required
  },
};

export const GroceryListResponseSchema: FunctionDeclaration = {
  name: 'GroceryListResponse',
  parameters: {
    type: Type.OBJECT,
    properties: {
      items: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Consolidated list of all grocery items needed with quantities (e.g., "Ground beef (1 lb)")'
      },
      categories: {
        type: Type.OBJECT,
        // Removed 'additionalProperties' as it's not supported by the Schema type.
        // Explicitly defining common grocery categories as per the prompt's example output.
        properties: {
          Produce: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Items in the Produce category' },
          'Meat & Seafood': { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Items in the Meat & Seafood category' },
          Dairy: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Items in the Dairy category' },
          Pantry: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Items in the Pantry category' },
          // Add other specific categories if they are consistently expected in the model's output.
        },
        description: 'Grocery items grouped by common shopping categories like Produce, Meat & Seafood, Dairy, Pantry'
      },
      stores: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Suggested store types and their purpose (e.g., "Supermarket - for meat, dairy, and produce")'
      }
    },
    required: ['items', 'categories', 'stores']
  }
};