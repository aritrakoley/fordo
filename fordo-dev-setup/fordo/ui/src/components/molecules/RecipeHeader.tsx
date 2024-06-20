import { glassStyleL3Dark } from "../atoms/commonStyles";

type RecipeHeaderPropType = {
  title?: string | null;
  description?: string | null;
};
const RecipeHeader = ({ title, description }: RecipeHeaderPropType) => {
  return (
    <div
      className={
        "flex flex-col p-6 w-full h-[25%] rounded-2xl" + glassStyleL3Dark
      }
    >
      <h1 className="text-6xl font-bold text-gray-100 mb-2">{title}</h1>
      <p className="text-lg pr-2 text-gray-400 overflow-y-auto">{description}</p>
    </div>
  );
};

export default RecipeHeader;
