type RecipeStep = {
  id?: number | null ;
  body: string | null | undefined;
  title: string | null | undefined;
  sort_order: number | null | undefined;
};

type Ingredient = {
  id: number | null | undefined;
  local_names: string[] | null | undefined;
  linked_recipe: number | null | undefined;
  ingredient_name: string | null | undefined;
  ingredient_details: string | null | undefined;
  quantity: number | null | undefined;
  unit: string | null | undefined;
};
