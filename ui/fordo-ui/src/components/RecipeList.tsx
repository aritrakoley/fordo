import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "./RecipeItem"
import { getRecipeList } from "../utils/api.utils";
import Recipe from "./Recipe";
import RecipeNew from "./RecipeNew";
import { addIcon } from "./atoms/Icons";

const RecipeList = () => {

  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);

  const [openPage, setOpenPage] = useState<string>("recipe_list");
  const [openRecipeId, setOpenRecipeId] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res))
  }, [])


  const handleRecipeItemClick = async (recipeId?: number) => {
    setOpenRecipeId(recipeId);
    setOpenPage("recipe_details");
  }

  const handleRecipeAddClick = async () => {
    setOpenPage("recipe_add");
    setOpenRecipeId(null);
  }

  const handleRecipeEditClick = async (recipeId?: number) => {
    
    setOpenRecipeId(recipeId);
    setOpenPage("recipe_edit");
  }

  const handlePageClose = async () => {
    setOpenRecipeId(null);
    setOpenPage("recipe_list");
    console.log({
      openPage,
      openRecipeId
    })
  }



  const list = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Recipes</h3>
        <div className="rounded-full bg-gray-700/70 m-2 top-0 right-0 text-white z-10 text-2xl" onClick={handleRecipeAddClick} >{addIcon}</div>
      </div>

      <div className="flow-rooti overflow-auto">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {recipeList?.length
            ? recipeList.map(r => <li key={r.id} className="py-3 sm:py-4">
              <RecipeItem recipe={r} handleClick={handleRecipeItemClick} handleEdit={handleRecipeEditClick}/>
            </li>)
            : null}
        </ul>
      </div>
    </>
  );

  console.log(openPage, openRecipeId)
  return (
    <>
      <div className="flex flex-col items-center w-full h-[100vh] bg-slate-700 mx-auto">
        <h1 className="text-9xl mb-4 text-slate-300">Fordo</h1>
        <div className="flex flex-col p-4 w-[80%] max-w-[80rem] h-[80%] overflow-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">

        {
            openPage ==="recipe_list"
              ? list
              : null
          }
          {
            openPage ==="recipe_details" && openRecipeId
              ? <Recipe recipeId={openRecipeId} handleClose={handlePageClose} />
              : null
          }
          {
            openPage === "recipe_add"
              ? <RecipeNew recipeId={null} handleClose={handlePageClose} />
              : null
          }
          {
            openPage === "recipe_edit"
              ? <RecipeNew recipeId={openRecipeId} handleClose={handlePageClose} />
              : null
          }
        </div>

      </div>
    </>
  )
}

export default RecipeList