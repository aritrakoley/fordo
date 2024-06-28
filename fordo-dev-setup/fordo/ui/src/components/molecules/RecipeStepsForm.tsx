import {
  SetFieldValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormFields } from "../pages/RecipeFormPage";
import RecipeStepForm from "../atoms/RecipeStepForm";
import { glassStyleButton } from "../atoms/commonStyles";
import { useRef } from "react";

type RecipeStepsFormPropType = {
  setValue: UseFormSetValue<FormFields>;
  watchRecipeSteps: RecipeStep[];
  steps: RecipeStep[];
};
const RecipeSteps = (props: RecipeStepsFormPropType) => {
  const { steps, setValue, watchRecipeSteps } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="flex flex-col flex-1 w-full h-[30%] mt-4 rounded-2xl">
      <ul className="w-full h-full overflow-y-auto">
        {watchRecipeSteps?.length
          ? watchRecipeSteps
              .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
              .map((step, idx) => (
                <li key={step.id} className="w-100">
                  <RecipeStepForm idx={idx + 1} step={step} />
                </li>
              ))
          : null}
      </ul>
      <div className="flex flex-col">
        <div className="relative z-0 w-full mb-10 group">
          <input
            ref={titleRef}
            name="form_recipe_header"
            id="form_recipe_header"
            className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Step Title
          </label>
        </div>
        <div className="relative z-0 w-full h-full group">
          <textarea
            ref={descRef}
            name="form_recipe_header"
            id="form_recipe_header"
            className="block py-2.5 px-2 w-full text-sm text-gray-100 bg-transparent rounded-2xl border-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="px-4 absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Step Description
          </label>
          <div className="flex justify-end w-full">
            <button
              className={
                "text-gray-100 rounded-full px-4 mt-1 mr-2" + glassStyleButton
              }
              onClick={() => {
                const newSteps = [...watchRecipeSteps];
                newSteps.push({
                  sort_order: watchRecipeSteps.length,
                  title: titleRef?.current?.value || "",
                  body: descRef?.current?.value || "",
                });
                setValue("recipe_steps", newSteps);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSteps;
