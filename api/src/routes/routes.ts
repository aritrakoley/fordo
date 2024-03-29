import { Router } from "express";
import {
  createIngredient,
  editIngredient,
  listIngredients,
} from "../controllers/ingredient.controller";
import {
  createMealType,
  editMealType,
  listMealType,
} from "../controllers/mealType.controller";

export const router = Router();

router.post("/ingredient/create", createIngredient);
router.patch("/ingredient/edit", editIngredient);
router.post("/ingredient/list", listIngredients);

router.post("/mealtype/create", createMealType);
router.patch("/mealtype/edit", editMealType);
router.post("/mealtype/list", listMealType);
