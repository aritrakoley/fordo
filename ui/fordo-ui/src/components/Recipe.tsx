import { useEffect, useState } from 'react';
import defaultImg from '../assets/default_recipe_bg.jpg';
import { mockRecipe } from '../utils/dummy.data';
import { getRecipeDetails } from '../utils/api.utils';
import { clipboardIcon, clockOutlineIcon, closeIcon, peopleIcon } from './atoms/Icons';

export type RecipeType = {
  "id": number | null | undefined;
  "recipe_name": string | null | undefined;
  "description": string | null | undefined,
  "prep_time": number | null | undefined;
  "cook_time": number | null | undefined;
  "calorie_count": string | null | undefined;
  "serving_size": number | null | undefined;
  "meal_types": { "id": number | null | undefined; "label": string | null | undefined; }[];
  "ingredients": {
    "id": number | null | undefined;
    "local_names": string[] | null | undefined;
    "linked_recipe": number | null | undefined;
    "ingredient_name": string | null | undefined;
    "ingredient_details": string | null | undefined;
    "quantity": number | null | undefined;
    "unit": string | null | undefined;
  }[];
  "steps":
  {
    "id": number | null | undefined;
    "body": string | null | undefined;
    "title": string | null | undefined;
    "sort_order": number | null | undefined;
  }[];
  "tags":
  {
    "id": number | null | undefined;
    "label": string | null | undefined;
  }[];

  "notes":
  {
    "id": number | null | undefined;
    "body": string | null | undefined;
    "title": string | null | undefined;
  }[]
}

type RecipePropType = { recipeId: number; handleClose: () => void };
const Recipe = ({ recipeId, handleClose }: RecipePropType) => {
  const [recipe, setRecipe] = useState<RecipeType>(mockRecipe);

  useEffect(() => {
    getRecipeDetails(recipeId).then((recipe) => setRecipe(recipe));
  }, [recipeId])

  if (!recipe) return null;
  return (
    <div className="flex mx-auto w-full ">
      <div className="relative inline-block w-full shadow p-4 rounded-lg bg-gray-600">
        <div className="rounded-full bg-gray-700/70 m-2 absolute top-0 right-0 text-white z-10 text-2xl" onClick={handleClose} >{closeIcon}</div>
        <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
          <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
            <img src={defaultImg} className="w-full h-full object-cover" />
          </div>

          <div className="absolute flex justify-center bottom-0 mb-3">
            <div className="flex bg-gray-600 px-4 py-1 space-x-10 rounded-lg overflow-hidden shadow">
              
              <p className="flex space-between font-medium text-gray-200">
                {clockOutlineIcon} <span className='ml-2'>{recipe.prep_time ? (recipe.prep_time / 60).toFixed(0) : 0} + {recipe.cook_time ? (recipe.cook_time / 60).toFixed(0) : 0}</span>
              </p>

              <p className="flex items-center font-medium text-gray-200">
                {clipboardIcon} <span className='ml-2'>{recipe.ingredients.length}</span>
              </p>

              <p className="flex items-center font-medium text-gray-200">
                {peopleIcon} <span className='ml-2'>{recipe.serving_size}</span>
              </p>
            </div>
          </div>

        </div>

        <div className="mt-4">
          <h2 className="font-medium text-base md:text-lg text-gray-200 line-clamp-1" >
            {recipe.recipe_name}
          </h2>
          <p className="mt-2 text-md text-gray-400" >
            {recipe.description}
          </p>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
          <div className="flex flex-col xl:items-center text-gray-100">
            <div className='text-2xl'>Meal Types:</div>
            <div>
              <ul>
                {
                  recipe.meal_types?.length
                    ? recipe.meal_types.map(mt => <li key={mt.id} className="capitalize">{mt.label}</li>)
                    : null
                }
              </ul>
            </div>
          </div>

          <div className="flex flex-col xl:items-center text-gray-100">
            <div className='text-2xl'>Tags:</div>
            <div>
              <ul>
                {
                  recipe.tags?.length
                    ? recipe.tags.map(t => <li key={t.id} className="capitalize">{t.label}</li>)
                    : null
                }
              </ul>
            </div>
          </div>

        </div>

        <div className="flow-root">
          <div className='text-2xl text-gray-100'>Ingredients:</div>
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              recipe.ingredients?.length
                ? recipe.ingredients.map(i => <li key={i.id}
                  className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 text-gray-200">
                  <span className='capitalize'>{i.ingredient_name}:</span> {i.quantity} {i.unit}
                </li>)
                : null
            }
          </ul>
        </div>

        <div className="mt-10 flow-root">
          <div className='text-2xl text-gray-100'>Steps:</div>
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              recipe.steps?.length
                ? recipe.steps.map(s => <li key={s.id}
                  className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 text-gray-200">
                  <span className='capitalize'>{s.sort_order}. {s.title}: <br />{s.body}</span>
                </li>)
                : null
            }
          </ul>
        </div>



        <div className="mt-10 flow-root">
          <div className='text-2xl text-gray-100'>Notes:</div>
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              recipe.notes?.length
                ? recipe.notes.map(n => <li key={n.id}
                  className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 text-gray-200">
                  <span className='capitalize'>{n.title} <br />{n.body}</span>
                </li>)
                : null
            }
          </ul>
        </div>
      </div>
    </div >
  )
}

export default Recipe;