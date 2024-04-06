import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import defaultImg from '../assets/default_recipe_bg.jpg';
import { addIconSmall, clockOutlineIcon, closeIcon, peopleIcon } from './atoms/Icons';
import { RecipeType } from './Recipe';
import { createMealType, getMealTypeList } from '../utils/api.utils';

type RecipeNewPropType = { handleClose: () => void };
type MealType =  {
    "id": number;
    "meal_type_label": string;
};
// const intiRecipe = {
//     id: "",
//     recipe_name: "",
//     description: "",
//     // prep_time: "",
//     cook_time: "",
//     calorie_count: "",
//     serving_size: "",
//     meal_types: "",
//     ingredients: [
//       {
//         id: 1,
//         unit: "litre",
//         quantity: 1,
//         local_names: ["jol / jawl"],
//         linked_recipe: null,
//         ingredient_name: "water",
//         ingredient_details: "",
//       },
//       {
//         id: 5,
//         unit: "grams",
//         quantity: 200,
//         local_names: ["chini"],
//         linked_recipe: null,
//         ingredient_name: "white sugar",
//         ingredient_details: null,
//       },
//       {
//         id: 8,
//         unit: "litre",
//         quantity: 1,
//         local_names: ["doodh"],
//         linked_recipe: null,
//         ingredient_name: "milk",
//         ingredient_details: "dairy / cow's milk",
//       },
//       {
//         id: 13,
//         unit: "pieces",
//         quantity: 2,
//         local_names: null,
//         linked_recipe: null,
//         ingredient_name: "mango",
//         ingredient_details: "seasonal fruit",
//       },
//     ],
//     steps: [
//       {
//         id: 3,
//         body: "Use clean water to wash mangoes to remove any dirt or other harmful substances",
//         title: "Wash mangoes",
//         sort_order: 1,
//       },
//       {
//         id: 4,
//         body: "Peel the mangoes and cut them in a way that allows you to separate the seed from the pulp. Keep the extracted pulp in separate container",
//         title: "Extract the mango pulp",
//         sort_order: 2,
//       },
//       {
//         id: 5,
//         body: "Put the milk, mango pulp, sugar into the belnder and blend until the consistency is thick but smooth",
//         title: "Blend",
//         sort_order: 3,
//       },
//       {
//         id: 6,
//         body: "Serve in glasses. Add water to dilute the smoothie  if required.",
//         title: "Serve",
//         sort_order: 4,
//       },
//     ],
//     tags: [
//       {
//         id: null,
//         label: null,
//       },
//     ],
//     notes: [
//       {
//         id: 1,
//         body: "Party",
//         title: "Party Title",
//       },
//     ],
//   };
const Recipe = ({handleClose}:RecipeNewPropType) => {
  const [primaryImage, setPrimaryImage] = useState(defaultImg);
  const [mealTypeOptions, setMealTypeOptions] = useState<MealType[]>([]);
  const [recipe, setRecipe] = useState<any>();

  const newMealType = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMealTypeList().then((mealTypes) => {
        setMealTypeOptions(mealTypes)
    })
  }, []);
  
  const handleRecipeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.name);
    setRecipe((prev: any) =>  {
        console.log({prev})
        let newState;
        switch(e.target.name) {
            case 'meal_type': 
              newState = {
                ...prev,
                meal_type:  {...prev.meal_type, [e.target.value]: !prev.meal_type[e.target.value]} 
              }
            break;
            default: newState =  {
                ...prev,
                [e.target.name]: e.target.value
            }
        }
        return newState;
    });
  }

  const handleNewMealType = async () => {
    let success = false;
    if(newMealType?.current?.value) { 
      success = await createMealType(newMealType.current.value) 
      newMealType.current.value = '';
    };
    if (success) {
      setMealTypeOptions((await getMealTypeList()))
    }
  }

  console.log({recipe});
  return (
    <div className="flex mx-auto w-full ">
      <div className="relative inline-block w-full shadow p-4 rounded-lg bg-gray-600">
        <div className="rounded-full bg-gray-700/70 m-2 absolute top-0 right-0 text-white z-10 text-2xl" onClick={handleClose} >{closeIcon}</div>
        <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
          <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
            <img src={primaryImage} className="w-full h-full object-cover" />
          </div>

          <div className="absolute flex justify-center bottom-0 mb-3">
          <div className="flex bg-gray-600 px-4 py-1 space-x-10 rounded-lg overflow-hidden shadow">
              <p className="flex space-between items-center font-medium text-gray-200">
                <label htmlFor="prep_time" className="block text-sm font-medium text-gray-200"> Prep {clockOutlineIcon}</label>
                <input type="number" id="prep_time" name="prep_time" className="w-10 h-10  ml-2 rounded-md text-gray-700 text-4xl" value={recipe?.prep_time || "" } onChange={handleRecipeChange} />
              </p>

              <p className="flex space-between items-center font-medium text-gray-200">
                <label htmlFor="cook_time" className="block text-sm font-medium text-gray-200"> Cook {clockOutlineIcon}</label>
                <input type="number" id="cook_time" name="cook_time" className="w-10 h-10  ml-2 rounded-md text-gray-700 text-4xl" value={recipe?.cook_time || "" } onChange={handleRecipeChange} />
              </p>

              <p className="flex space-between items-center font-medium text-gray-200">
                <label htmlFor="serving_size" className="block text-sm font-medium text-gray-200"> Serving Size {peopleIcon}</label>
                <input type="number" id="serving_size" name="serving_size" className="w-10 h-10  ml-2 rounded-md text-gray-700 text-4xl" value={recipe?.serving_size || "" } onChange={handleRecipeChange} />
              </p>

            </div>
          </div>

        </div>

         <div className="mt-4">
            <label htmlFor="recipe_name" className="block text-sm font-medium text-gray-200"> Recipe Name: </label>
            <input type="text" id="recipe_name" name="recipe_name" className="w-[80%] rounded-md text-gray-700 text-4xl" value={recipe?.recipe_name || "" } onChange={handleRecipeChange} />
          <p className="mt-2 text-md text-gray-400" >
            <label htmlFor="description" className="block text-sm font-medium text-gray-200"> Description: </label>
            <textarea id="description" name="description" className="w-[80%] rounded-md text-gray-700 text-4xl" value={recipe?.description || "" } onChange={handleRecipeChange}>
            </textarea>
          </p>
        </div>

        <div className="flex mt-8 ">
          <div className="w-full flex flex-col xl:items-center text-gray-100  ">
            <div className='text-2xl'>Meal Types:</div>
            <div>
              <ul>
                {
                  mealTypeOptions?.length
                    ? mealTypeOptions.map(mt => (
                        <li key={mt.id} className="capitalize">
                            
                            <input type="checkbox" id="meal_type" name="meal_type" checked={recipe?.meal_type?.[`${mt.id},${mt.meal_type_label}`] || false} value={`${mt.id},${mt.meal_type_label}`} onChange={handleRecipeChange} />
                            <label htmlFor="meal_type" className="text-sm font-medium text-gray-200"> {mt.meal_type_label} </label>
                        </li>)
                        )
                    : null
                }
              </ul>
              <div className="flex  items-center text-gray-100">
                <label htmlFor="newMealType" className="block text-sm font-medium text-gray-200 mr-2"> New Meal Type: </label>
                <input ref={newMealType} type="text" id="newMealType" name="newMealType" className="w-[50%] h-8 rounded-md text-gray-700 text-2xl" />
                <div className='ml-2' onClick={handleNewMealType}>{addIconSmall}</div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col xl:items-center text-gray-100">
            <div className='text-2xl'>Tags:</div>
            <div>
              <ul>
                {
                  recipe.tags?.length
                    ? recipe.tags.map(t => <li key={t.id} className="capitalize">{t.label}</li>)
                    : null
                }
              </ul>
            </div> */}
          </div>

        </div>

        {/* <div className="flow-root">
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
      </div> */}
    </div >
  )
}

export default Recipe;