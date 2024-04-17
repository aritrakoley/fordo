import { MealTypeRow } from "./database.types";

export type MealType = MealTypeRow;

export type MealTypeCreateRequest = Partial<Omit<MealType, "id" | "is_active">>;

export type MealTypeUpdateRequest = Partial<MealType> & Pick<MealType, "id">;
