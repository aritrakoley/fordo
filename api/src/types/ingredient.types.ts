import { IngredientRow } from "./database.types";

export type Ingredient = IngredientRow & { local_names: string[] };

export type IngredientCreateRequest = Partial<
  Omit<Ingredient, "id" | "is_active">
>;
export type IngredientUpdateRequest = Partial<Ingredient> &
  Pick<Ingredient, "id">;
