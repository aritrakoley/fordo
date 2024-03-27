import * as ingredientRepository from "../repository/ingredient.repository";
import {
  Ingredient,
  IngredientCreateRequest,
  IngredientUpdateRequest,
} from "../types/ingredient.types";

export const createIngredient = async (request: IngredientCreateRequest) => {
  const ingredient: Partial<Ingredient> = request;

  const [ok, result, error] = await ingredientRepository.insertIngredient(
    ingredient
  );
  return [ok, result, error];
};

export const editIngredient = async (request: IngredientUpdateRequest) => {
  const ingredient: Partial<Ingredient> = request;

  const [ok, result, error] = await ingredientRepository.updateIngredient(
    ingredient
  );

  console.log([ok, result, error]);
  return [ok, result, error];
};
