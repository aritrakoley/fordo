export interface RecipeRow {
  
}

export interface Ingredient {
  id: number;
  ingredient_name: string;
  ingredient_details: string;
  ingredient_local_names: string[];
}

export type RecipeIngredient = Pick<Ingredient,  'id'> & ;

export interface RecipeStep {
  sort_order: number;
  title: string;
  body: string;
}

export interface Note {
  title: string;
  body: string;
}

export default interface Recipe {
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
