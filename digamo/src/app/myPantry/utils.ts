import { ExpiryStatus, PantryItem } from "../../../types/gemini";

/**
 * Calculates the expiry status of a pantry item based on its expiry date.
 * @param expiryDate The expiry date of the item.
 * @returns The ExpiryStatus.
 */
export const calculateExpiryStatus = (expiryDate: Date): ExpiryStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  const itemExpiryDate = new Date(expiryDate);
  itemExpiryDate.setHours(0, 0, 0, 0); // Normalize to start of day

  const diffTime = itemExpiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return ExpiryStatus.EXPIRED;
  } else if (diffDays <= 3) {
    return ExpiryStatus.EXPIRING_SOON;
  } else if (diffDays <= 7) {
    return ExpiryStatus.USE_SOON;
  } else {
    return ExpiryStatus.FRESH;
  }
};

/**
 * Matches recipe ingredients with available pantry items.
 * @param recipeIngredients An array of ingredient strings from a recipe.
 * @param pantryItems An array of the user's pantry items.
 * @returns An object containing arrays of matched and missing ingredients.
 */
export const matchIngredients = (
  recipeIngredients: string[],
  pantryItems: PantryItem[]
): { matchedIngredients: string[]; missingIngredients: string[] } => {
  const matchedIngredients: string[] = [];
  const missingIngredients: string[] = [];
  const availablePantryNames = pantryItems.map(item => item.name.toLowerCase());

  recipeIngredients.forEach(recipeIng => {
    // Simple matching: check if any pantry item name is included in the recipe ingredient string
    // or if the recipe ingredient (without quantity) is similar to a pantry item.
    const isMatched = availablePantryNames.some(pantryName => {
      const cleanedRecipeIng = recipeIng.toLowerCase().replace(/(\d+\s*(g|kg|ml|l|oz|cup(s)?|piece(s)?)\s*)?\b/g, '').trim();
      return recipeIng.toLowerCase().includes(pantryName) || pantryName.includes(cleanedRecipeIng);
    });

    if (isMatched) {
      matchedIngredients.push(recipeIng);
    } else {
      missingIngredients.push(recipeIng);
    }
  });

  return { matchedIngredients, missingIngredients };
};

/**
 * Parses a quantity and unit from an ingredient string.
 * Supports simple cases like "500g chicken", "2 cups rice", "12 pieces eggs".
 * @param ingredientString The full ingredient string (e.g., "500g chicken breast").
 * @returns An object with name, quantity, and unit.
 */
export const parseIngredientQuantity = (ingredientString: string) => {
  const regex = /(\d+\.?\d*)\s*(g|kg|ml|l|oz|cup(s)?|piece(s)?)?\s*(.*)/i;
  const match = ingredientString.match(regex);

  if (match) {
    const quantity = parseFloat(match[1]);
    const unit = match[2] || '';
    const name = match[4].trim(); // Rest of the string is the name

    return {
      name: name,
      quantity: isNaN(quantity) ? null : quantity,
      unit: unit,
      originalString: ingredientString
    };
  }

  // Fallback for ingredients without explicit quantity at the start
  return {
    name: ingredientString.trim(),
    quantity: null,
    unit: '',
    originalString: ingredientString
  };
};

/**
 * Updates the quantity of a pantry item (deduct or add).
 * @param pantryItems The current array of pantry items.
 * @param itemIndex The index of the item to update.
 * @param amount The numerical amount to deduct/add.
 * @param operation 'deduct' or 'add'.
 * @returns A new array of pantry items with the updated quantity.
 */
export const updatePantryItemQuantity = (
  pantryItems: PantryItem[],
  itemIndex: number,
  amount: number | null,
  operation: 'deduct' | 'add'
): PantryItem[] => {
  if (itemIndex === -1 || amount === null) {
    return pantryItems;
  }

  const updatedPantry = [...pantryItems];
  const itemToUpdate = { ...updatedPantry[itemIndex] };

  // Simple quantity parsing for pantry item (e.g., "500g" -> 500)
  const currentQuantityMatch = itemToUpdate.quantity.match(/(\d+\.?\d*)/);
  const currentNumericQuantity = currentQuantityMatch ? parseFloat(currentQuantityMatch[1]) : 0;
  const currentUnit = currentQuantityMatch ? itemToUpdate.quantity.replace(currentQuantityMatch[0], '').trim() : '';

  let newNumericQuantity: number;
  if (operation === 'deduct') {
    newNumericQuantity = Math.max(0, currentNumericQuantity - amount);
  } else { // 'add'
    newNumericQuantity = currentNumericQuantity + amount;
  }

  itemToUpdate.quantity = `${newNumericQuantity}${currentUnit ? ' ' + currentUnit : ''}`;
  updatedPantry[itemIndex] = itemToUpdate;

  return updatedPantry;
};
