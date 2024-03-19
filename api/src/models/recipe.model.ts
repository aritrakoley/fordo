import { simpleQuery } from "../db/fordo-db.main";
import CreateRecipeRequest from "../types/CreateRecipeRequest";

export const insertRecipeDetails = async (recipe: CreateRecipeRequest) => {
  const [ok, result, error] = await simpleQuery("select * from fordo.recipe;");

  return [ok, result, error];
};
