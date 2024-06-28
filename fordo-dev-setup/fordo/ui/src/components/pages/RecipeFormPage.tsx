import { useEffect, useState } from "react";
import defaultImg from "../../assets/default_recipe_bg.jpg";
import { getRecipeDetails } from "../../utils/api.utils";
import { closeIcon, hotMealIcon, saveIcon } from "../atoms/Icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  glassStyleButton,
  glassStyleL1Gray,
  glassStyleL2Dark,
  glassStyleL3Dark,
} from "../atoms/commonStyles";
import RecipeStepsForm from "../molecules/RecipeStepsForm";
import Ingredients from "../molecules/Ingredients";
import { RecipeType } from "./RecipeDetailsPage";
import InfoBarForm from "../molecules/InfoBarForm";
import { SubmitHandler, useForm } from "react-hook-form";
import RecipeHeaderForm from "../molecules/RecipeHeaderForm";

export type FormFields = {
  recipe_name: string;
  recipe_description: string;
  prep_time: number;
  cook_time: number;
  serving_size: number;
  recipe_steps: RecipeStep[];
};

const RecipeFormPage = () => {
  const location = useLocation();
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<RecipeType | undefined>();

  const { register, watch, setValue, handleSubmit } = useForm<FormFields>();
  const watchRecipeSteps = watch("recipe_steps", []);

  useEffect(() => {
    if (recipeId) {
      getRecipeDetails(parseInt(recipeId)).then((recipe) => setRecipe(recipe));
    }

    if (!recipeId && location.pathname !== "/recipe/new") {
      navigate("/");
    }
  }, [recipeId]);

  const handleClose = () => {
    navigate("/");
  };

  const handleSave: SubmitHandler<FormFields> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      className="flex w-full h-full mx-auto"
      onSubmit={handleSubmit(handleSave)}
    >
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

        <button
          className={
            "w-12 h-12 p-1 absolute top-0 right-[4%] z-10 m-2 text-2xl text-white rounded-full" +
            glassStyleButton
          }
          type="submit"
        >
          <span className="w-10 h-10">{saveIcon}</span>
        </button>

        <div className={"flex flex-col w-[40%] h-full rounded-2xl mr-2 gap-4 "}>
          <div className="z-10 h-[40%] mt-[-5rem] ml-[-5rem] bg-black flex justify-center overflow-hidden rounded-lg shadow-lg shadow-gray-950 ">
            <div className="relative w-full">
              <img
                src={defaultImg}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute top-0 left-0 mt-2 w-fit">
                <InfoBarForm
                  register={register}
                  prep_time={recipe?.prep_time}
                  cook_time={recipe?.cook_time}
                  serving_size={recipe?.serving_size}
                />
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
            <Ingredients ingredients={recipe?.ingredients ?? []} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[60%] h-full rounded-2xl ml-2">
          <RecipeHeaderForm
            register={register}
            title={recipe?.recipe_name}
            description={recipe?.description}
          />
          <RecipeStepsForm
            setValue={setValue}
            watchRecipeSteps={watchRecipeSteps}
            steps={recipe?.steps ?? []}
          />
        </div>
      </div>
    </form>
  );
};

export default RecipeFormPage;
