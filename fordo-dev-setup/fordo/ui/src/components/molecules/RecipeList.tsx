import { Link } from "react-router-dom";
import { glassStyleL2, glassStyleL2Dark } from "../atoms/commonStyles";
import { addIcon, searchIcon } from "../atoms/Icons";
import RecipeItem, { RecipeItemType } from "./RecipeItem";
import { useEffect, useState } from "react";
import { getRecipeList } from "../../utils/api.utils";

const RecipeList = () => {
  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res));
  }, []);

  return (
    <>
      <div
        className={
          "w-full flex flex-col items-center justify-start mb-4 rounded-lg py-2"
        }
      >
        <div className={"w-[85%] h-px rounded-full" + glassStyleL2}></div>
        <div
          className={
            "w-full text-3xl font-bold text-center my-1 ml-[1rem] tracking-[1.25rem] leading-none text-gray-100 uppercase"
          }
        >
          Recipes
        </div>
        <div className={"w-[85%] h-px rounded-full" + glassStyleL2}></div>
      </div>

      <div className="flex items-center justify-center w-full mb-4 group/bar ">
        <div className="flex items-center flex-1 h-full px-4 text-gray-100 rounded-full group/search backdrop-blur-md bg-gradient-to-br from-gray-500/40 to-gray-950/40 shadow-input border-1 border-gray-100/20">
          <input
            className={`w-full h-10 px-2 bg-transparent outline-none peer`}
            placeholder="Search"
          ></input>
          <span className="duration-300 ease-in-out peer-focus:opacity-0">
            {searchIcon}
          </span>
        </div>

        <Link
          className={
            "group/new h-10 w-10 flex items-center justify-center text-xl transition-all duration-300 ease-in-out overflow-hidden hover:w-full rounded-full ml-2" +
            glassStyleL2Dark
          }
          to={"/recipe/new"}
        >
          <span className="flex items-center justify-center w-full overflow-hidden text-gray-100 text-nowrap">
            Add New Recipe
          </span>
          <span className="text-gray-100 duration-100 ease-in-out group-hover/new:opacity-0 group-hover/new:fixed group-hover/new:right-0">
            {addIcon}
          </span>
        </Link>
      </div>

      <div className="flex-1 flow-root overflow-auto">
        <ul role="list">
          {recipeList?.length
            ? recipeList.map((r) => (
                <li key={r.id}>
                  <RecipeItem recipe={r} />
                </li>
              ))
            : null}
        </ul>
      </div>

      <div className="flex items-center justify-center w-full my-2 text-xl text-gray-100">
        <div className={"w-full h-px rounded-full" + glassStyleL2}></div>
      </div>
    </>
  );
};

export default RecipeList;
