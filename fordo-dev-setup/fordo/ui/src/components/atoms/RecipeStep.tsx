import React from "react";
import { glassStyleL3, glassStyleL3Dark } from "./commonStyles";

type RecipeStepProp = { idx: number; step: RecipeStep };
const RecipeStep = (props: RecipeStepProp) => {
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
        <p className="text-6xl font-bold text-gray-400 flex items-center justify-center">
          {idx < 10 ? "0" + idx : idx}
        </p>
      </div>
      <div className="w-[80%] h-full flex flex-col items-start justify-start ml-5">
        <h1 className="text-4xl text-gray-100 flex items-center justify-center mb-2">
          {step.title}
        </h1>
        <p className="w-full max-h-16 text-md pr-2 text-gray-400 overflow-y-auto">
          {step.body}
        </p>
      </div>
    </div>
  );
};

export default RecipeStep;
