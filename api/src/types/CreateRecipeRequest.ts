export interface RecipeIngredient {
  ingredient_id: number;
  quantity: number;
  unit: string;
}

export interface RecipeStep {
  sort_order: number;
  title: string;
  body: string;
}

export interface RecipeNote {
  title: string;
  body: string;
}

export default interface CreateRecipeRequest {
  recipe_name: string;
  prep_time: number;
  cook_time: number;
  calorie_count: number;
  serving_size: number;
  ingredients: RecipeIngredient[];
  meal_type: number;
  recipe_steps: RecipeStep[];
  tags: number[];
  notes: RecipeNote[];
}
