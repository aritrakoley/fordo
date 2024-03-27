import { Router } from "express";
import {
  createIngredient,
  editIngredient,
  listIngredients,
} from "../controllers/ingredient.controller";

export const router = Router();

router.post("/ingredient/create", createIngredient);

router.patch("/ingredient/edit", editIngredient);

router.post("/ingredient/list", listIngredients);
