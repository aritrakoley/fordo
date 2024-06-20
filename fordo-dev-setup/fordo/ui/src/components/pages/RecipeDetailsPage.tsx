import { useEffect, useState } from "react";
import defaultImg from "../../assets/default_recipe_bg.jpg";
import { mockRecipe } from "../../utils/dummy.data";
import { getRecipeDetails } from "../../utils/api.utils";
import {
  clipboardIcon,
  clockOutlineIcon,
  closeIcon,
  peopleIcon,
} from "../atoms/Icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  glassStyleButton,
  glassStyleL1,
  glassStyleL1Gray,
  glassStyleL2Dark,
} from "../atoms/commonStyles";
import RecipeHeader from "../molecules/RecipeHeader";
import RecipeSteps from "../molecules/RecipeSteps";

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
            <div className="w-full transition-transform duration-500 ease-in-out transform hover:scale-110">
              <img src={defaultImg} className="object-cover w-full h-full" />
            </div>
          </div>
          <div
            className={"flex w-full flex-1 rounded-2xl mr-2" + glassStyleL2Dark}
          ></div>
        </div>
        <div className="flex flex-col gap-2 w-[60%] h-full rounded-2xl ml-2">
          <RecipeHeader
            title={recipe.recipe_name}
            description={recipe.description}
          />
          <RecipeSteps steps={recipe.steps} />
        </div>

        {/* <div className="relative mt-[-5rem] ml-[-5rem] flex justify-center overflow-hidden rounded-lg h-96 w-96">
          <div className="w-full transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img src={defaultImg} className="object-cover w-full h-full" />
          </div>

          <div className="absolute bottom-0 flex justify-center mb-3">
            <div className="flex px-4 py-1 space-x-10 overflow-hidden bg-gray-600 rounded-lg shadow">
              <p className="flex font-medium text-gray-200 space-between">
                {clockOutlineIcon}
                <span className="ml-2">
                  {recipe?.prep_time ? (recipe.prep_time / 60).toFixed(0) : 0} +{" "}
                  {recipe?.cook_time ? (recipe.cook_time / 60).toFixed(0) : 0}
                </span>
              </p>

              <p className="flex items-center font-medium text-gray-200">
                {clipboardIcon}
                <span className="ml-2">
                  {recipe?.ingredients?.length ?? "-"}
                </span>
              </p>

              <p className="flex items-center font-medium text-gray-200">
                {peopleIcon}
                <span className="ml-2">{recipe?.serving_size ?? "-"}</span>
              </p>
            </div>
          </div>
        </div> */}

        {/* <div className="mt-4">
          <h2 className="text-base font-medium text-gray-200 md:text-lg line-clamp-1">
            {recipe?.recipe_name}
          </h2>
          <p className="mt-2 text-gray-400 text-md">{recipe?.description}</p>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
          <div className="flex flex-col text-gray-100 xl:items-center">
            <div className="text-2xl">Meal Types:</div>
            <div>
              <ul>
                {recipe?.meal_types?.length
                  ? recipe.meal_types.map((mt) => (
                      <li key={mt.id} className="capitalize">
                        {mt.label}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>

          <div className="flex flex-col text-gray-100 xl:items-center">
            <div className="text-2xl">Tags:</div>
            <div>
              <ul>
                {recipe?.tags?.length
                  ? recipe.tags.map((t) => (
                      <li key={t.id} className="capitalize">
                        {t.label}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="flow-root">
          <div className="text-2xl text-gray-100">Ingredients:</div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recipe?.ingredients?.length
              ? recipe.ingredients.map((i) => (
                  <li
                    key={i.id}
                    className="w-full py-4 text-gray-200 border-b-2 border-neutral-100 dark:border-white/10"
                  >
                    <span className="capitalize">{i.ingredient_name}:</span>{" "}
                    {i.quantity} {i.unit}
                  </li>
                ))
              : null}
          </ul>
        </div>

        <div className="flow-root mt-10">
          <div className="text-2xl text-gray-100">Steps:</div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recipe?.steps?.length
              ? recipe.steps.map((s) => (
                  <li
                    key={s.id}
                    className="w-full py-4 text-gray-200 border-b-2 border-neutral-100 dark:border-white/10"
                  >
                    <span className="capitalize">
                      {s.sort_order}. {s.title}: <br />
                      {s.body}
                    </span>
                  </li>
                ))
              : null}
          </ul>
        </div>

        <div className="flow-root mt-10">
          <div className="text-2xl text-gray-100">Notes:</div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recipe?.notes?.length
              ? recipe.notes.map((n) => (
                  <li
                    key={n.id}
                    className="w-full py-4 text-gray-200 border-b-2 border-neutral-100 dark:border-white/10"
                  >
                    <span className="capitalize">
                      {n.title} <br />
                      {n.body}
                    </span>
                  </li>
                ))
              : null}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
