import { validate, validateEquals } from "typia";
import {
  RecipeCreateRequest,
  RecipeUpdateRequest,
} from "../types/recipe.types";
import { Request, Response } from "express";
import * as recipeService from "../services/recipe.service";

export const createRecipe = async (req: Request, res: Response) => {
  const validation = validateEquals<RecipeCreateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await recipeService.createRecipe(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Recipe created successfully" });
};

// TODO: make this a get request, mask_id in url
export const getRecipeDetails = async (req: Request, res: Response) => {
  const validation = validateEquals<{ id: number }>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, result, error] = await recipeService.getRecipeDetails(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res
    .status(200)
    .json({ message: "Recipe details fetched successfully", details: result });
};

// export const editRecipe = async (req: Request, res: Response) => {
//   const validation = validate<RecipeUpdateRequest>(req.body);

//   if (!validation.success) {
//     res.status(400).json({ validationErrors: validation.errors });
//     return;
//   }

//   const [ok, _result, error] = await recipeService.editRecipe(req.body);

//   if (!ok) {
//     res.status(500).json({ serverError: error });
//     return;
//   }

//   res.status(200).json({ message: "Recipe updated successfully" });
// };

// export const listRecipes = async (req: Request, res: Response) => {
//   const validation = validate<{ ids: number[] } | {}>(req.body);

//   if (!validation.success) {
//     res.status(400).json({ validationErrors: validation.errors });
//     return;
//   }

//   const [ok, result, error] = await recipeService.listRecipe(req.body);

//   if (!ok) {
//     res.status(500).json({ serverError: error });
//     return;
//   }

//   res.status(200).json({
//     message: "Recipes fetched successfully",
//     recipes: result,
//   });
// };
