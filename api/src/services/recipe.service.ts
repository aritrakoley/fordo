import * as recipeRepository from "../repository/recipe.repository";
import {
  Recipe,
  RecipeCreateRequest,
  RecipeUpdateRequest,
} from "../types/recipe.types";

export const createRecipe = async (request: RecipeCreateRequest) => {
  const recipe: Partial<Recipe> = request;

  const [ok, result, error] = await recipeRepository.insertRecipe(recipe);
  return [ok, result, error];
};

export const getRecipeDetails = async (request: { id: number }) => {
  const recipeId: number = request.id;

  const [ok, result, error] = await recipeRepository.getRecipeDetails(recipeId);
  return [ok, result, error];
};

export const editRecipe = async (request: RecipeUpdateRequest) => {
  const [ok, result, error] = await recipeRepository.updateRecipe(request);
  return [ok, result, error];
};

export const listRecipe = async (request: { ids: number[] }) => {
  const recipe_ids: number[] = request.ids || [];

  const [ok, result, error] = await recipeRepository.listRecipe(recipe_ids);

  return [ok, result, error];
};
