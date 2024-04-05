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
