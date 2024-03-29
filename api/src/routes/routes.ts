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
import { createTag, editTag, listTag } from "../controllers/tag.controller";
import { createNote, editNote, listNote } from "../controllers/note.controller";

export const router = Router();

router.post("/ingredient/create", createIngredient);
router.patch("/ingredient/edit", editIngredient);
router.post("/ingredient/list", listIngredients);

router.post("/mealtype/create", createMealType);
router.patch("/mealtype/edit", editMealType);
router.post("/mealtype/list", listMealType);

router.post("/tag/create", createTag);
router.patch("/tag/edit", editTag);
router.post("/tag/list", listTag);

router.post("/note/create", createNote);
router.patch("/note/edit", editNote);
// router.post("/note/list", listNote);
