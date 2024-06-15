import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { pencilIcon } from "../atoms/Icons";
import {
  glassStyleButton,
  glassStyleL1Dark,
  glassStyleL2,
  glassStyleL2Dark,
} from "../atoms/commonStyles";
import { useState } from "react";

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

  const [itemActive, setItemActive] = useState(false);
  const [editButtonActive, setEditButtonActive] = useState(false);
  return (
    <div
      className={
        `flex items-center p-1 mx-auto mb-1 text-gray-100 duration-30 ease-in-out ${itemActive ? "scale-98" : ""} rounded-full hover:bg-gradient-to-br hover:from-cyan-200/20 hover:to-gray-500/20` +
        glassStyleL2Dark
      }
      onClick={() => handleRecipeItemClick(id)}
      onMouseDown={() => {
        setItemActive(true);
      }}
      onMouseUp={() => {
        setItemActive(false);
      }}
      onMouseOut={() => {
        setItemActive(false);
      }}
    >
      <div className="flex-shrink-0">
        <img
          className="w-10 h-10 rounded-full border-1 border-gray-200/30"
          src={defaultImage}
          alt="default food image"
        />
      </div>
      <div className="flex-1 min-w-0 ml-2">
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
          `z-10 flex items-center justify-center w-10 h-10 duration-30 text-gray-100 rounded-full ${editButtonActive ? "scale-95" : ""}` +
          glassStyleButton
        }
        onClick={(e) => {
          e.stopPropagation();
          // console.log('child',e.currentTarget === e.target, e.currentTarget, e.target)
          handleRecipeEditClick(id);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          console.log("down child");
          setEditButtonActive(true);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          console.log("up child");
          setEditButtonActive(false);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          setEditButtonActive(false);
        }}
      >
        {pencilIcon}
      </div>
    </div>
  );
};

export default RecipeItem;
