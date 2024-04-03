import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "./RecipeItem"
import { getRecipeList } from "../utils/api.utils";
import Recipe from "./Recipe";

const RecipeList = () => {

  const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);
  const [isRecipeOpen, setIsRecipeOpen] = useState<boolean>(false);
  const [openRecipeId, setOpenRecipeId] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    getRecipeList().then((res) => setRecipeList(res))
  }, [])


  const handleRecipeItemClick = async (recipeId?: number) => {
    setOpenRecipeId(recipeId);
    setIsRecipeOpen(true);
  }

  const handleRecipeDetailsClose = async () => {
    setOpenRecipeId(null);
    setIsRecipeOpen(false);
    console.log({
      isRecipeOpen,
      openRecipeId
    })
  }

  const list = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Recipes</h3>
      </div>

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {recipeList?.length
            ? recipeList.map(r => <li key={r.id} className="py-3 sm:py-4">
              <RecipeItem recipe={r} onClick={handleRecipeItemClick} />
            </li>)
            : null}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col items-center w-full min-h-[100vh] h-fit bg-slate-700 mx-auto">
        <h1 className="text-9xl mb-4 text-slate-300">Fordo</h1>
        <div className="p-4 min-w-[70%] max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">

          {
            isRecipeOpen && openRecipeId
              ? <Recipe recipeId={openRecipeId} handleClose={handleRecipeDetailsClose} />
              : list
          }
        </div>

      </div>
    </>
  )
}

export default RecipeList