import defaultImage from "../assets/default.png";
import { pencilIcon } from "./atoms/Icons";

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
  handleClick: (recipeId?: number) => void;
  handleEdit: (recipeId?: number) => void;
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

  return (
    <div
      className="flex mx-5 items-center space-x-4 hover:bg-gray-700 active:scale-95 ease-in-out duration-75 bg-slate-700 py-2 px-4 rounded-2xl text-white"
      onClick={(e) => {
        // console.log('parent',e.currentTarget === e.target, e.currentTarget, e.target)
        props.handleClick(id);
      }}
    >
      <div className="flex-shrink-0">
        <img
          className="w-16 h-16 rounded-full"
          src={defaultImage}
          alt="default food image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl text-gray-900 truncate dark:text-white">
          {recipe_name}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {description}
          <br />
          Calories per serving: {calorie_count}
          <br />
          Serves: {serving_size} people
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        Prep Time: {prep_time}
        <br />
        Cook Time: {cook_time}
      </div>
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/30 text-white z-10 text-2xl"
        onClick={(e) => {
          e.stopPropagation();
        //   console.log('child',e.currentTarget === e.target, e.currentTarget, e.target)
          props.handleEdit(id);
        }}
      >
        {pencilIcon}
      </div>
    </div>
  );
};

export default RecipeItem;
