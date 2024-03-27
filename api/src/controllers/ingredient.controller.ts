import { validate } from "typia";
import {
  IngredientCreateRequest,
  IngredientUpdateRequest,
} from "../types/ingredient.types";
import { Request, Response } from "express";
import * as ingredientService from "../services/ingredient.service";

export const createIngredient = async (req: Request, res: Response) => {
  const validation = validate<IngredientCreateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await ingredientService.createIngredient(
    req.body
  );

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Ingredient created successfully" });
};

export const editIngredient = async (req: Request, res: Response) => {
  const validation = validate<IngredientUpdateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await ingredientService.editIngredient(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Ingredient updated successfully" });
};

export const listIngredients = async (req: Request, res: Response) => {
  console.log({ body: req.body, type: typeof req.body });
  const validation = validate<{ ids: number[] } | {}>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, result, error] = await ingredientService.listIngredient(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({
    message: "Ingredients fetched successfully",
    ingredients: result,
  });
};
