import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { pencilIcon } from "../atoms/Icons";
import {
  glassStyleL1Dark,
  glassStyleL2,
  glassStyleL2Dark,
} from "../atoms/commonStyles";

export type RecipeItemType = Partial<{
  id: number;
  recipe_name: string | null;
  description: string | null;
  prep_time: number | null;
  cook_time: number | null;
  calorie_count: number | null;
  serving_size: number | null;
}>;

type RecipeItemPropType = {
  recipe: RecipeItemType;
  // handleClick: (recipeId?: number) => void;
  // handleEdit: (recipeId?: number) => void;
};
const RecipeItem = (props: RecipeItemPropType) => {
  const {
    id,
    recipe_name,
    description,
    prep_time,
    cook_time,
    calorie_count,
    serving_size,
  } = props.recipe;

  const navigate = useNavigate();
  const handleRecipeItemClick = async (recipeId?: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleRecipeEditClick = async (recipeId?: number) => {
    navigate(`/recipe/${recipeId}/edit`);
  };

  return (
    <div
      className={
        "flex items-center px-2 mx-auto text-gray-100 duration-30 ease-in-out active:scale-98 rounded-lg backface-hidden hover:bg-gradient-to-br hover:from-cyan-200/20 hover:to-gray-500/20" +
        glassStyleL2Dark 
      }
      // onClick={() => handleRecipeItemClick(id)}
    >
      <div className="flex-shrink-0">
        <img
          className="w-10 h-10 rounded-full"
          src={defaultImage}
          alt="default food image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg text-gray-100 truncate">{recipe_name}</p>
        {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {description}
          <br />
          Calories per serving: {calorie_count}
          <br />
          Serves: {serving_size} people
        </p> */}
      </div>
      {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        Prep Time: {prep_time}
        <br />
        Cook Time: {cook_time}
      </div> */}
      <div
        className={
          "z-10 flex items-center justify-center w-8 h-8 text-gray-100 rounded-full" +
          glassStyleL2
        }
        onClick={(e) => {
          e.stopPropagation();
          // console.log('child',e.currentTarget === e.target, e.currentTarget, e.target)
          handleRecipeEditClick(id);
        }}
      >
        {pencilIcon}
      </div>
    </div>
  );
};

export default RecipeItem;
