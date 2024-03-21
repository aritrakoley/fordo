import { IngredientCreateRequest } from "../types/ingredient.types";

export const createIngredient = async (request: IngredientCreateRequest) => {
  return [true, {}, null];
};
