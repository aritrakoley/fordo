import { validate } from "typia";
import { IngredientCreateRequest } from "../types/ingredient.types";
import { Request, Response } from "express";
import * as ingredientService from "../services/ingredient.service";

export const createIngredient = async (req: Request, res: Response) => {
  const validation = validate<IngredientCreateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, result, error] = await ingredientService.createIngredient(
    req.body
  );

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Ingredient created successfully" });
};
