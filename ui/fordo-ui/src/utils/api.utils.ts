export const getRecipeList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/recipe/list`, {
      method: "POST",
    })
  ).json();
  console.log(res.recipes);
  return res.recipes;
};

export const getRecipeDetails = async (recipeId: number) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/recipe/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: recipeId,
      }),
    })
  ).json();
  console.log(res.details[0]);
  return res.details[0];
};


export const getMealTypeList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/mealtype/list`, {
      method: "POST"
    })
  ).json();
  console.log(res.mealTypes);
  return res.mealTypes;
};


export const createMealType = async (meal_type_label: string) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  
  const res = 
    await fetch(`http://localhost:3000/mealtype/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meal_type_label  }),
    })
  const success = res.status === 200;
  const resBody = await res.json();
  console.log(resBody);
  return success;
};


export const getTagList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/tag/list`, {
      method: "POST"
    })
  ).json();
  console.log(res.tags);
  return res.tags;
};


export const createTag = async (tag_label: string) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  
  const res = 
    await fetch(`http://localhost:3000/tag/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag_label  }),
    })
  const success = res.status === 200;
  const resBody = await res.json();
  console.log(resBody);
  return success;
};


export const getIngredientList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/ingredient/list`, {
      method: "POST"
    })
  ).json();
  console.log(res.ingredients);
  return res.ingredients;
};

