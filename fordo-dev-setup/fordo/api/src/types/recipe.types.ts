import {
  IngredientRow,
  NoteRow,
  RecipeIngredientMapRow,
  RecipeRow,
  RecipeStepRow,
} from "./database.types";

export type RecipeIngredient = Pick<IngredientRow, "id"> &
  Pick<RecipeIngredientMapRow, "quantity" | "unit">;

export type RecipeStep = Pick<RecipeStepRow, "sort_order" | "title" | "body">;

export type RecipeNote = Pick<NoteRow, "title" | "body">;

export type Recipe = RecipeRow & {
  meal_types: number[];
  tags: number[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  notes: RecipeNote[];
};

export type RecipeCreateRequest = Partial<Omit<Recipe, "id" | "is_active">>;
export type RecipeUpdateRequest = Partial<Recipe> & Pick<Recipe, "id">;
