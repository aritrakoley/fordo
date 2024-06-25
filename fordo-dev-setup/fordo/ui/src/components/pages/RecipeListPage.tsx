import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "../molecules/RecipeItem";
import { getRecipeList } from "../../utils/api.utils";
import { addIcon, searchIcon } from "../atoms/Icons";
import { Link, Outlet } from "react-router-dom";
import {
  glassStyleL1,
  glassStyleL2,
  glassStyleL2Dark,
} from "../atoms/commonStyles";

const RecipeListPage = () => {
  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res));
  }, []);

  const list = (
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

      <div className="group/bar w-full flex items-center justify-center mb-4 ">
        <div className="group/search flex flex-1 h-full items-center rounded-full px-4 text-gray-100 backdrop-blur-md bg-gradient-to-br from-gray-500/40 to-gray-950/40 shadow-input border-1 border-gray-100/20">
          <input
            className={`w-full h-10 px-2 bg-transparent outline-none peer`}
            placeholder="Search"
          ></input>
          <span className="peer-focus:opacity-0 duration-300 ease-in-out">
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
          <span className="w-full overflow-hidden flex text-nowrap justify-center items-center text-gray-100">
            Add New Recipe
          </span>
          <span className="text-gray-100 group-hover/new:opacity-0 group-hover/new:fixed group-hover/new:right-0 duration-100 ease-in-out">
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

      <div className="flex items-center justify-center text-xl text-gray-100 w-full my-2">
        <div className={"w-full h-px rounded-full" + glassStyleL2}></div>
      </div>
    </>
  );

  return (
    <>
      <div className="flex items-center justify-between w-full h-[100vh] mx-auto bg-[url('/public/dark-bg.png')] bg-cover">
        {/* Left Pane */}
        <section className="flex flex-col w-[24rem] h-[100vh] justify-start">
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
              "w-ful h-full flex flex-col p-2 m-4 mt-2 overflow-auto rounded-2xl" +
              glassStyleL1
            }
          >
            {list}
          </div>
        </section>

        {/* Main View */}
        <section className="flex flex-col p-4 w-full h-[100vh] justify-start">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default RecipeListPage;
