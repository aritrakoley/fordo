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
