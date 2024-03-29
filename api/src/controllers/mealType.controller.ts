import { Request, Response } from "express";
import { validate } from "typia";
import {
  MealTypeCreateRequest,
  MealTypeUpdateRequest,
} from "../types/mealType.types";
import * as mealTypeService from "../services/mealType.service";

export const createMealType = async (req: Request, res: Response) => {
  const validation = validate<MealTypeCreateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await mealTypeService.createMealType(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Meal Type created successfully" });
};

export const editMealType = async (req: Request, res: Response) => {
  const validation = validate<MealTypeUpdateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await mealTypeService.editMealType(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Meal Type updated successfully" });
};

export const listMealType = async (req: Request, res: Response) => {
  console.log({ body: req.body, type: typeof req.body });
  const validation = validate<{ ids: number[] } | {}>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, result, error] = await mealTypeService.listMealType(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({
    message: "Meal Type(s) fetched successfully",
    mealTypes: result,
  });
};
