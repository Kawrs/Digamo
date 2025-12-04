export interface GeminiConfig {
  apiKey: string;
  model?: string;
}

export interface RecipeGenerationRequest {
  ingredients: string[];
  dietaryRestrictions?: string[];
  cuisine?: string;
  servings?: number;
}

export interface RecipeGenerationResponse {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
}

export interface MealSuggestionRequest {
  mealType: string;
  availableIngredients: string[];
}

export interface GroceryListRequest {
  desiredMeals: string[];
  currentPantry: string[];
}

export enum RecipeType {
  QUICK_SNACK_MEAL = 'quick_snack_meal',
  WEEKLY_MEAL_PLAN = 'weekly_meal_plan',
}