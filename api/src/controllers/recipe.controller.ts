import { Request, Response } from "express";
import { validate } from "typia";
import { RecipeCreateRequest } from "../types/recipe.types";

// export const createRecipe = async (req: Request, res: Response) => {
//   const validationResult = validate<RecipeCreateRequest>(req.body);

//   if (!validationResult.success) {
//     res.status(400).send({ validationErrors: validationResult.errors });
//     return;
//   }

//   // const [ok, result, error] = await insertRecipeDetails(req.body);
//   if (!ok) {
//     res.status(500).send({ serverError: error });
//     return;
//   }

//   res.status(200).send(result);
// };