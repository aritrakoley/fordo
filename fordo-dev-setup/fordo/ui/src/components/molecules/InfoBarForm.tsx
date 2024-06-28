import { UseFormRegister } from "react-hook-form";
import { clockOutlineIcon, peopleIcon, potIcon } from "../atoms/Icons";
import {
  glassStyleL2Dark,
  glassStyleL3,
  glassStyleL3Dark,
} from "../atoms/commonStyles";
import { FormFields } from "../pages/RecipeFormPage";

type InfoBarPropType = {
  register: UseFormRegister<FormFields>;
  prep_time?: number | null;
  cook_time?: number | null;
  serving_size?: number | null;
};
const InfoBarForm = ({
  register,
  prep_time,
  cook_time,
  serving_size,
}: InfoBarPropType) => {
  console.log({
    prep_time,
    cook_time,
    serving_size,
  });
  return (
    <div className={"text-gray-100 flex flex-col gap-1 rounded-full px-4 py-2"}>
      <div
        className={
          "w-fit flex items-center justify-start gap-2 text-2xl rounded-e-full pl-1 pr-4 py-1" +
          glassStyleL2Dark
        }
      >
        {clockOutlineIcon}
        <div className="flex items-center h-full text-gray-100 rounded-full group/search backdrop-blur-md bg-gradient-to-br from-gray-500/40 to-gray-950/40 shadow-input border-1 border-gray-100/20">
          <input
            {...register("prep_time")}
            className={`w-36 h-8 px-2 text-lg bg-transparent outline-none peer`}
            placeholder="Prep Time"
            type="number"
            min={0}
          ></input>
        </div>
      </div>
      <div
        className={
          "w-fit flex items-center justify-start gap-2 text-2xl rounded-e-full pl-1 pr-4 py-1" +
          glassStyleL2Dark
        }
      >
        <span className="w-6 h-6">{potIcon}</span>
        <div className="flex items-center h-full text-gray-100 rounded-full group/search backdrop-blur-md bg-gradient-to-br from-gray-500/40 to-gray-950/40 shadow-input border-1 border-gray-100/20">
          <input
            {...register("cook_time")}
            className={`w-36 h-8 px-2 text-lg bg-transparent outline-none peer`}
            placeholder="Cooking Time"
            type="number"
            min={0}
          ></input>
        </div>
      </div>
      <div
        className={
          "w-fit flex items-center justify-start gap-2 text-2xl rounded-e-full pl-1 pr-4 py-1" +
          glassStyleL2Dark
        }
      >
        {peopleIcon}
        <div className="flex items-center h-full text-gray-100 rounded-full group/search backdrop-blur-md bg-gradient-to-br from-gray-500/40 to-gray-950/40 shadow-input border-1 border-gray-100/20">
          <input
            {...register("serving_size")}
            className={`w-36 h-8 px-2 text-lg bg-transparent outline-none peer`}
            placeholder="Serves"
            type="number"
            min={0}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default InfoBarForm;
