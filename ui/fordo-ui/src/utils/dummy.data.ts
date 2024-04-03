export const mockRecipeList = [
  {
    id: 2,
    recipe_name: "Mango Shake",
    description: null,
    prep_time: 600,
    cook_time: 120,
  },
  {
    id: 3,
    recipe_name: "Mango Shake",
    description: null,
    prep_time: 600,
    cook_time: 120,
  },
  {
    id: 4,
    recipe_name: "Mango Shake",
    description: null,
    prep_time: 600,
    cook_time: 120,
  },
];

export const mockRecipe = {
  id: 2,
  recipe_name: "Mango Shake",
  description:
    "A mango shake is a luscious blend of ripe mangoes, creamy milk, and a hint of sweetness. The succulent flesh of the mangoes, bursting with tropical flavor, is peeled, diced, and pureed to perfection. Combined with chilled milk, it creates a velvety smooth texture that caresses the palate. A touch of sugar or honey enhances the natural sweetness of the mango, while ice cubes lend a refreshing chill. The vibrant yellow hue of the shake mirrors the sun-kissed brilliance of the mango itself. Sipping a mango shake is like indulging in a taste of paradise, a blissful escape to tropical delight.",
  prep_time: 600,
  cook_time: 120,
  calorie_count: "1000.00",
  serving_size: 2,
  meal_types: [
    {
      id: 6,
      label: "snack",
    },
    {
      id: 7,
      label: "beverage",
    },
  ],
  ingredients: [
    {
      id: 1,
      unit: "litre",
      quantity: 1,
      local_names: ["jol / jawl"],
      linked_recipe: null,
      ingredient_name: "water",
      ingredient_details: "",
    },
    {
      id: 5,
      unit: "grams",
      quantity: 200,
      local_names: ["chini"],
      linked_recipe: null,
      ingredient_name: "white sugar",
      ingredient_details: null,
    },
    {
      id: 8,
      unit: "litre",
      quantity: 1,
      local_names: ["doodh"],
      linked_recipe: null,
      ingredient_name: "milk",
      ingredient_details: "dairy / cow's milk",
    },
    {
      id: 13,
      unit: "pieces",
      quantity: 2,
      local_names: null,
      linked_recipe: null,
      ingredient_name: "mango",
      ingredient_details: "seasonal fruit",
    },
  ],
  steps: [
    {
      id: 3,
      body: "Use clean water to wash mangoes to remove any dirt or other harmful substances",
      title: "Wash mangoes",
      sort_order: 1,
    },
    {
      id: 4,
      body: "Peel the mangoes and cut them in a way that allows you to separate the seed from the pulp. Keep the extracted pulp in separate container",
      title: "Extract the mango pulp",
      sort_order: 2,
    },
    {
      id: 5,
      body: "Put the milk, mango pulp, sugar into the belnder and blend until the consistency is thick but smooth",
      title: "Blend",
      sort_order: 3,
    },
    {
      id: 6,
      body: "Serve in glasses. Add water to dilute the smoothie  if required.",
      title: "Serve",
      sort_order: 4,
    },
  ],
  tags: [
    {
      id: null,
      label: null,
    },
  ],
  notes: [
    {
      id: 1,
      body: "Party",
      title: "Party Title",
    },
  ],
};
