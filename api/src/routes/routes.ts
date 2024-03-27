import { Router } from "express";
import {
  createIngredient,
  editIngredient,
} from "../controllers/ingredient.controller";

export const router = Router();

router.post("/ingredient/create", createIngredient);

router.patch("/ingredient/edit", editIngredient);
