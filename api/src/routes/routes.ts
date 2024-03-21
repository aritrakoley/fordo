import { Router } from "express";
import { createIngredient } from "../controllers/ingredient.controller";

export const router = Router();

router.post("/ingredient/create", createIngredient);
