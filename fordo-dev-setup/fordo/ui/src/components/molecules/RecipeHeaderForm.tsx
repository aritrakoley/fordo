import { UseFormRegister } from "react-hook-form";
import { glassStyleL3Dark } from "../atoms/commonStyles";
import { FormFields } from "../pages/RecipeFormPage";

type RecipeHeaderPropType = {
  register: UseFormRegister<FormFields>;
  title?: string | null;
  description?: string | null;
};
const RecipeHeaderForm = ({
  register,
  title,
  description,
}: RecipeHeaderPropType) => {
  return (
    <div
      className={
        "flex flex-col p-6 w-full h-[28%] rounded-2xl" + glassStyleL3Dark
      }
    >
      <div className="relative z-0 w-full mb-10 group">
        <input
          {...register("recipe_name")}
          name="form_recipe_header"
          id="form_recipe_header"
          className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Recipe Name
        </label>
      </div>
      <div className="relative z-0 w-full h-full group">
        <textarea
          {...register("recipe_description")}
          name="form_recipe_header"
          id="form_recipe_header"
          className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent rounded-2xl border-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="px-4 absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          Recipe Description...
        </label>
      </div>
    </div>
  );
};

export default RecipeHeaderForm;
