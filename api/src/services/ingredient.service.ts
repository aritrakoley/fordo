import { insertIngredient } from "../repository/ingredient.repository";
import { Ingredient, IngredientCreateRequest } from "../types/ingredient.types";

export const createIngredient = async (request: IngredientCreateRequest) => {
  const ingredient: Partial<Ingredient> = request;

  const [ok, result, error] = await insertIngredient(ingredient);
  return [ok, result, error];
};
