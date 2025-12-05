// Database types for Supabase tables

export interface PantryItem {
  id: string;
  user_id?: string;
  name: string;
  quantity: string;
  expiry_date: string;
  category: 'ingredient' | 'condiment';
  created_at?: string;
  updated_at?: string;
}

export interface MealPlan {
  id: string;
  user_id?: string;
  date: string;
  meal_name: string;
  recipe_data?: any;
  created_at?: string;
}

export interface Recipe {
  id: string;
  user_id?: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prep_time?: string;
  cook_time?: string;
  servings?: string;
  created_at?: string;
}

export interface GroceryList {
  id: string;
  user_id?: string;
  meal_plan_id?: string;
  items: GroceryItem[];
  created_at?: string;
}

export interface GroceryItem {
  name: string;
  quantity: string;
  checked: boolean;
}