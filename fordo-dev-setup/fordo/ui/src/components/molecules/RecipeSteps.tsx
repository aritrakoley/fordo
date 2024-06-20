import { glassStyleL3 } from "../atoms/commonStyles";

type RecipeStep = {
  id: number | null | undefined;
  body: string | null | undefined;
  title: string | null | undefined;
  sort_order: number | null | undefined;
};
type RecipeStepsPropType = { steps: RecipeStep[] };
const RecipeSteps = (props: RecipeStepsPropType) => {
  const { steps } = props;
  return (
    <div className={"flex w-full flex-1 rounded-2xl mr-2" + glassStyleL3}>
      {JSON.stringify(steps)}
      <ul>
        {steps?.length
          ? steps.map((step) => <li key={step.id}>{step.toString()}</li>)
          : null}
      </ul>
    </div>
  );
};

export default RecipeSteps;
