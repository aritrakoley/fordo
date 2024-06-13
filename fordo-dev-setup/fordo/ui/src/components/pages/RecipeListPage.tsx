import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "../RecipeItem";
import { getRecipeList } from "../../utils/api.utils";
import { addIcon } from "../atoms/Icons";
import { Link } from "react-router-dom";
import imgDarkBg from "../../assets/dark-bg.jpg";

const RecipeListPage = () => {
  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res));
  }, []);

  const list = (
    <>
      <div className="flex items-center justify-between mb-4 ">
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
  const glassStyle =
    " backdrop-blur-md bg-gradient-to-br from-gray-300/30 to-gray-950/60 shadow-md shadow-gray-900/80 border-1 border-gray-600/30";
  return (
    <>
      <div className="flex items-center justify-between w-full h-[100vh] mx-auto bg-[url('/public/dark-bg.png')] bg-cover">
        {/* Left Pane */}
        <section className="flex flex-col max-w-[24rem] h-[100vh] justify-start border border-red-400">
          <div
            id="brand-logo"
            className={
              "flex items-center justify-center text-center p-2 m-4 mb-2 rounded-2xl" +
              glassStyle
            }
          >
            <div className="text-3xl font-bold text-gray-300 ml-[1.5rem] tracking-[1.5rem] text-center uppercase">
              Fordo
            </div>
          </div>

          <div
            className={
              "flex flex-col p-2 m-4 mt-2 overflow-auto rounded-2xl" + glassStyle
            }
          >
            {list}
          </div>
        </section>

        {/* Main View */}
        <section className="flex flex-col md:w-3/4 h-[100vh] justify-center border border-blue-400"></section>
      </div>
    </>
  );
};

export default RecipeListPage;
