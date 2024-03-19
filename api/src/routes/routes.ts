import { Router } from "express";
import { createRecipe } from "../controllers/basic.controller";

export const router = Router();

router.post("/recipe/create", createRecipe);
