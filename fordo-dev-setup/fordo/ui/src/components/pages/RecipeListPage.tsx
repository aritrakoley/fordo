import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "../molecules/RecipeItem";
import { getRecipeList } from "../../utils/api.utils";
import { addIcon } from "../atoms/Icons";
import { Link } from "react-router-dom";
import { glassStyleL1, glassStyleL2 } from "../atoms/commonStyles";

const RecipeListPage = () => {
  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res));
  }, []);

  const list = (
    <>
      <div
        className={
          "flex flex-col items-center justify-between mb-4 rounded-lg py-2"
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

      <div className="flow-root overflow-auto">
        <ul role="list">
          {recipeList?.length
            ? recipeList.map((r) => (
                <li key={r.id} className="py-1">
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
      <div className="flex items-center justify-between w-full h-[100vh] mx-auto bg-[url('/public/dark-bg.png')] bg-cover">
        {/* Left Pane */}
        <section className="flex flex-col max-w-[24rem] h-[100vh] justify-start border border-red-400">
          <div
            id="brand-logo"
            className={
              "flex items-center justify-center text-center p-2 m-4 mb-2 rounded-2xl" +
              glassStyleL1
            }
          >
            <div className="text-4xl font-bold text-gray-100 ml-[1.5rem] tracking-[1.5rem] text-center uppercase">
              Fordo
            </div>
          </div>

          <div
            className={
              "flex flex-col p-2 m-4 mt-2 overflow-auto rounded-2xl" +
              glassStyleL1
            }
          >
            {list}
          </div>
        </section>

        {/* Main View */}
        <section className="flex flex-col md:w-3/4 h-[100vh] justify-start border border-blue-400">
          <div>
            <Link
              className="top-0 right-0 z-10 m-2 text-2xl text-white rounded-full bg-gray-700/70"
              to={"/recipe/new"}
            >
              {addIcon}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecipeListPage;
