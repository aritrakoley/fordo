import { glassStyleL3, glassStyleL3Dark } from "./commonStyles";

type RecipeStepFormProp = { idx: number; step: RecipeStep };
const RecipeStepForm = (props: RecipeStepFormProp) => {
  const { idx, step } = props;
  return (
    <div
      className={
        "w-full h-fit flex items-stretch justify-start p-2 text-white rounded-full mb-2" +
        glassStyleL3Dark
      }
    >
      <div
        className={
          "min-w-32 h-32 flex items-center justify-center rounded-full" +
          glassStyleL3
        }
      >
        <p className="flex items-center justify-center text-6xl font-bold text-gray-400">
          {idx < 10 ? "0" + idx : idx}
        </p>
      </div>
      <div className="w-[80%] h-full flex flex-col items-start justify-start ml-5">
        <h1 className="flex items-center justify-center mb-2 text-4xl text-gray-100">
          {step.title}
        </h1>
        <p className="w-full pr-2 overflow-y-auto text-gray-400 max-h-16 text-md">
          {step.body}
        </p>
      </div>
    </div>
  );
};

export default RecipeStepForm;
