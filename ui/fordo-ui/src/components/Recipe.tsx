import { useState } from 'react';
import defaultImg from '../assets/default_recipe_bg.jpg';
import { mockRecipe } from '../utils/dummy.data';

type RecipeType = {
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

const clockOutlineIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const clipboardIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
);

const peopleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>

);

const closeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

);

type RecipePropType = { recipeId: number; handleClose: () => void };
const Recipe = ({ recipeId, handleClose }: RecipePropType) => {
  const [recipe, setRecipe] = useState<RecipeType>(mockRecipe);
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