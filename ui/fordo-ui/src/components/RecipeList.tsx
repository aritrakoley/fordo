import { useEffect, useState } from "react";
import RecipeItem, { RecipeItemType } from "./RecipeItem"
import { getRecipeList } from "../utils/api.utils";

const RecipeList = () => {

    const [recipeList, setRecipeList] = useState<RecipeItemType[]>([]);
    useEffect(() => {
        getRecipeList().then((res) => setRecipeList(res))
    }, [])


    const handleRecipeItemClick = async (recipeId?: number) => {
        console.log(recipeId)
    }

    return (
        <>
            <div className="flex flex-col items-center w-full h-[100vh] bg-slate-700 mx-auto">
                <h1 className="text-9xl text-slate-300">Fordo</h1>
                <div className="p-4 min-w-[70%] max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">

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
                </div>

            </div>
        </>
    )
}

export default RecipeList