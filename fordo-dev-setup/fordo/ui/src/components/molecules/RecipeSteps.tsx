import RecipeStep from "../atoms/RecipeStep";

type RecipeStepsPropType = { steps: RecipeStep[] };
const RecipeSteps = (props: RecipeStepsPropType) => {
  const { steps } = props;
  return (
    <div className="flex flex-col overflow-y-auto w-full flex-1 rounded-2xl mt-4">
      <ul className="w-full h-full">
        {steps?.length
          ? steps
              .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
              .map((step, idx) => (
                <li key={step.id} className="w-100">
                  <RecipeStep idx={idx + 1} step={step} />
                </li>
              ))
          : null}
      </ul>
    </div>
  );
};

export default RecipeSteps;
