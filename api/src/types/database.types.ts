export interface RecipeRow {
  id: number;
  is_active: boolean;
  recipe_name: string;
  prep_time: number;
  cook_time: number;
  calorie_count: number;
  serving_size: number;
}

export interface IngredientRow {
  id: number;
  is_active: boolean;
  ingredient_name: string;
  ingredient_details: string;
  linked_recipe: number;
}

export interface IngredientLocalNameRow {
  id: number;
  is_active: boolean;
  ingredient_id: string;
  local_name: string;
}

export interface MealTypeRow {
  id: number;
  is_active: boolean;
  meal_type_label: string;
}

export interface NoteRow {
  id: number;
  is_active: boolean;
  recipe_id: number;
  title: string;
  body: string;
}

export interface RecipeIngredientMapRow {
  id: number;
  is_active: boolean;
  recipe_id: number;
  ingredient_id: number;
  quantity: number;
  unit: string;
}

export interface RecipeMealTypeMapRow {
  id: number;
  is_active: boolean;
  recipe_id: number;
  meal_type_id: number;
}

export interface RecipeStepRow {
  id: number;
  is_active: boolean;
  recipe_id: number;
  sort_order: number;
  title: string;
  body: string;
}

export interface TagRow {
  id: number;
  is_active: boolean;
  tag_label: string;
}

export interface RecipeTagMapRow {
  id: number;
  is_active: boolean;
  tag_id: number;
  recipe_id: number;
}
