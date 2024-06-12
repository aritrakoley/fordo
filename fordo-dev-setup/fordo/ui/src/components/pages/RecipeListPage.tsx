import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "../RecipeItem";
import { getRecipeList } from "../../utils/api.utils";
import { addIcon } from "../atoms/Icons";
import { Link } from "react-router-dom";

const RecipeListPage = () => {
  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res));
  }, []);

  const list = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">
          Recipes
        </h3>
        <Link
          className="top-0 right-0 z-10 m-2 text-2xl text-white rounded-full bg-gray-700/70"
          to={"/recipe/new"}
        >
          {addIcon}
        </Link>
      </div>

      <div className="flow-root overflow-auto">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {recipeList?.length
            ? recipeList.map((r) => (
                <li key={r.id} className="py-3 sm:py-4">
                  <RecipeItem recipe={r} />
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );

  // console.log(openPage, openRecipeId);
  return (
    <>
      <div className="flex flex-col items-center w-full h-[100vh] bg-slate-700 mx-auto">
        <h1 className="mb-4 text-9xl text-slate-300">Fordo</h1>
        <div className="flex flex-col p-4 w-[80%] max-w-[80rem] h-[80%] overflow-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          {list}
        </div>
      </div>
    </>
  );
};

export default RecipeListPage;
