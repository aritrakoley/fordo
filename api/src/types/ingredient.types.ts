import { IngredientRow } from "./database.types";

export type Ingredient = IngredientRow & { local_names: string[] };

export type IngredientCreateRequest = Omit<Ingredient, "id" | "is_active">;
export type IngredientUpdateRequest = Partial<Ingredient> &
  Pick<Ingredient, "id">;
