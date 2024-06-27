import { useEffect, useState } from "react";
import defaultImg from "../../assets/default_recipe_bg.jpg";
import { mockRecipe } from "../../utils/dummy.data";
import { getRecipeDetails } from "../../utils/api.utils";
import {
  clipboardIcon,
  clockOutlineIcon,
  closeIcon,
  hotMealIcon,
  peopleIcon,
} from "../atoms/Icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  glassStyleButton,
  glassStyleL1,
  glassStyleL1Gray,
  glassStyleL2Dark,
  glassStyleL3Dark,
} from "../atoms/commonStyles";
import RecipeHeader from "../molecules/RecipeHeader";
import RecipeSteps from "../molecules/RecipeSteps";
import InfoBar from "../molecules/InfoBar";
import IngredientItem from "../molecules/IngredientItem";
import Ingredients from "../molecules/Ingredients";

export type RecipeType = {
  id: number | null | undefined;
  recipe_name: string | null | undefined;
  description: string | null | undefined;
  prep_time: number | null | undefined;
  cook_time: number | null | undefined;
  calorie_count: string | null | undefined;
  serving_size: number | null | undefined;
  meal_types: {
    id: number | null | undefined;
    label: string | null | undefined;
  }[];
  ingredients: {
    id: number | null | undefined;
    local_names: string[] | null | undefined;
    linked_recipe: number | null | undefined;
    ingredient_name: string | null | undefined;
    ingredient_details: string | null | undefined;
    quantity: number | null | undefined;
    unit: string | null | undefined;
  }[];
  steps: {
    id: number | null | undefined;
    body: string | null | undefined;
    title: string | null | undefined;
    sort_order: number | null | undefined;
  }[];
  tags: {
    id: number | null | undefined;
    label: string | null | undefined;
  }[];

  notes: {
    id: number | null | undefined;
    body: string | null | undefined;
    title: string | null | undefined;
  }[];
};

// type RecipePropType = { recipeId: number; handleClose: () => void };
const RecipeDetailsPage = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<RecipeType>(mockRecipe);

  useEffect(() => {
    if (recipeId) {
      getRecipeDetails(parseInt(recipeId)).then((recipe) => setRecipe(recipe));
    } else {
      navigate("/");
    }
  }, [recipeId]);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="flex w-full h-full mx-auto">
      <div
        className={
          "flex w-full p-4 mt-[5rem] ml-[5rem] rounded-lg shadow" +
          glassStyleL1Gray
        }
      >
        <div
          className={
            "absolute top-0 right-0 z-10 m-2 text-2xl text-white rounded-full" +
            glassStyleButton
          }
          onClick={handleClose}
        >
          {closeIcon}
        </div>

        <div className={"flex flex-col w-[40%] h-full rounded-2xl mr-2 gap-4 "}>
          <div className="z-10 h-[40%] mt-[-5rem] ml-[-5rem] bg-black flex justify-center overflow-hidden rounded-lg shadow-lg shadow-gray-950 ">
            <div className="relative w-full">
              <img
                src={defaultImg}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute top-0 left-0 mt-2 w-fit">
                <InfoBar />
              </div>
            </div>
          </div>

          <div className="flex w-full max-h-[10%]">
            <div
              className={
                "flex flex-col w-full h-full flex-1 rounded-2xl px-4 mr-2" +
                glassStyleL3Dark
              }
            >
              <h1 className="text-gray-100">Meal Types :</h1>
              <ul className="mb-2 overflow-auto">
                {recipe?.meal_types
                  ? recipe.meal_types.map((mt) => (
                      <li key={mt.id}>
                        <div className="flex items-center gap-2 px-2 text-gray-100">
                          {hotMealIcon}
                          {mt.label}
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div
              className={
                "flex flex-col w-full h-full flex-1 rounded-2xl px-4" +
                glassStyleL3Dark
              }
            >
              <h1 className="text-gray-100">Tags :</h1>
              <div className="flex flex-wrap mb-2 overflow-auto">
                {recipe?.tags
                  ? recipe.tags.map((t) => (
                      <div
                        key={t.id}
                        className={
                          "flex gap-2 items-center text-gray-100 px-2 rounded-full m-1" +
                          glassStyleButton
                        }
                      >
                        {t.label}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div
            className={
              "flex w-full max-h-[calc(60% + 5rem)] overflow-hidden flex-1 rounded-2xl p-4" +
              glassStyleL2Dark
            }
          >
            <Ingredients ingredients={recipe?.ingredients} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[60%] h-full rounded-2xl ml-2">
          <RecipeHeader
            title={recipe.recipe_name}
            description={recipe.description}
          />
          <RecipeSteps steps={recipe.steps} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
