import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import defaultImg from "../assets/default_recipe_bg.jpg";
import {
  addIconSmall,
  clockOutlineIcon,
  closeIcon,
  peopleIcon,
} from "./atoms/Icons";
import {
  createMealType,
  createRecipe,
  createTag,
  editRecipe,
  formDataToRecipePayload,
  getIngredientList,
  getMealTypeList,
  getRecipeDetails,
  getTagList,
  recipeResponseToFormData,
} from "../utils/api.utils";

type RecipeNewPropType = { recipeId: number | null | undefined; handleClose: () => void };
type MealType = {
  id: number;
  meal_type_label: string | null;
};

type Tag = {
  id: number;
  tag_label: string | null;
};

type Ingredient = {
  id: number;
  ingredient_name: string | null;
  ingredient_details: string | null;
  linked_recipe: string | null;
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
const Recipe = ({ recipeId, handleClose }: RecipeNewPropType) => {
  const [primaryImage, setPrimaryImage] = useState(defaultImg);
  const [recipe, setRecipe] = useState<any>({
    meal_types: {},
    tags: {},
    ingredients: {},
    recipe_steps: {},
    notes: {},
  });

  const [mealTypeOptions, setMealTypeOptions] = useState<MealType[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  const [ingredientOptions, setIngredientOptions] = useState<Ingredient[]>([]);
  const [showIngredientOptions, setShowIngredientOptions] =
    useState<boolean>(false);
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState<string>("");

  const newMealType = useRef<HTMLInputElement>(null);
  const newTag = useRef<HTMLInputElement>(null);

  const newStepTitle = useRef<HTMLInputElement>(null);
  const newStepBody = useRef<HTMLTextAreaElement>(null);

  const newNoteTitle = useRef<HTMLInputElement>(null);
  const newNoteBody = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getMealTypeList().then((mealTypes) => {
      setMealTypeOptions(mealTypes);
    });

    getTagList().then((mealTypes) => {
      setTagOptions(mealTypes);
    });

    getIngredientList().then((ingredients) => {
      setIngredientOptions(ingredients);
    });

    if (recipeId) {
      getRecipeDetails(recipeId).then((recipe) => {
        setRecipe(recipeResponseToFormData(recipe));
      });
    }
  }, []);

  const handleRecipeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    setRecipe((prev: any) => {
      console.log({ prev });
      let newState;
      switch (e.target.name.split("-")[0]) {
        case "meal_types":
          newState = {
            ...prev,
            meal_types: {
              ...prev.meal_types,
              [e.target.value]: !prev.meal_types[e.target.value],
            },
          };
          break;

        case "tag":
          newState = {
            ...prev,
            tags: {
              ...prev.tags,
              [e.target.value]: !prev.tags[e.target.value],
            },
          };
          break;

        case "ingredient":
          const [id, field] = e.target.name.split("-")[1].split("_");
          newState = {
            ...prev,
            ingredients: {
              ...prev.ingredients,
              [id]: { ...prev.ingredients[id], [field]: e.target.value },
            },
          };
          break;
        default:
          newState = {
            ...prev,
            [e.target.name]: e.target.value,
          };
      }
      return newState;
    });
  };

  const handleNewMealType = async () => {
    let success = false;
    if (newMealType?.current?.value) {
      success = await createMealType(newMealType.current.value);
      newMealType.current.value = "";
    }
    if (success) {
      setMealTypeOptions(await getMealTypeList());
    }
  };

  const handleNewTag = async () => {
    let success = false;
    if (newTag?.current?.value) {
      success = await createTag(newTag.current.value);
      newTag.current.value = "";
    }
    if (success) {
      setTagOptions(await getTagList());
    }
  };

  const handleIngredientSearchTermChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientSearchTerm(e.target.value);
  };

  const handleIngredientMap = (i: Ingredient) => {
    setRecipe((prev: any) => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [i.id]: { id: i.id, label: i.ingredient_name, quantity: 0, unit: "" },
      },
    }));
  };

  const handleNewStep = (e: MouseEvent<HTMLButtonElement>) => {
    if (!newStepTitle?.current?.value && !newStepBody?.current?.value) return;

    const keys = Object.keys(recipe.recipe_steps).map((e) => parseInt(e));
    const order = keys.length ? Math.max(...keys) : 0;
    console.log(Object.keys(recipe.recipe_steps).map((e) => parseInt(e)));
    setRecipe((prev: any) => ({
      ...prev,
      recipe_steps: {
        ...prev.recipe_steps,
        [order + 1]: {
          title: newStepTitle?.current?.value,
          body: newStepBody?.current?.value,
        },
      },
    }));
  };

  const handleRemoveStep = (key: number) => {
    setRecipe((prev: any) => {
      const { [key]: _, ...rest } = prev.recipe_steps;
      return {
        ...prev,
        recipe_steps: rest,
      };
    });
  };

  const handleNewNote = (e: MouseEvent<HTMLButtonElement>) => {
    if (!newNoteTitle?.current?.value && !newNoteBody?.current?.value) return;

    const keys = Object.keys(recipe.notes).map((e) => parseInt(e));
    const order = keys.length ? Math.max(...keys) : 0;
    console.log(Object.keys(recipe.notes).map((e) => parseInt(e)));
    setRecipe((prev: any) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [order + 1]: {
          title: newNoteTitle?.current?.value,
          body: newNoteBody?.current?.value,
        },
      },
    }));
  };

  const handleRemoveNote = (key: number) => {
    setRecipe((prev: any) => {
      const { [key]: _, ...rest } = prev.notes;
      return {
        ...prev,
        notes: rest,
      };
    });
  };

  const handleSaveRecipe = async () => {
    console.log("============ Recipe To Save ============");
    console.log(recipe);
    console.log(JSON.stringify(recipe, null, 2));
    console.log("========================================");

    const payload = formDataToRecipePayload(recipe);
    console.log("============ Payload To Send ============");
    console.log(JSON.stringify(payload, null, 2));
    console.log("========================================");

    const success = recipeId ? await editRecipe(payload) : await createRecipe(payload);
    if (success) {
      handleClose();
    }
  };

  return (
    <div className="flex mx-auto w-full ">
      <div className="relative inline-block w-full shadow p-4 rounded-lg bg-gray-600">
        <div
          className="rounded-full bg-gray-700/70 m-2 absolute top-0 right-0 text-white z-10 text-2xl"
          onClick={handleClose}
        >
          {closeIcon}
        </div>
        <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
          <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
            <img src={primaryImage} className="w-full h-full object-cover" />
          </div>

          <div className="absolute flex justify-center bottom-0 mb-3">
            <div className="flex bg-gray-600 px-4 py-1 space-x-10 rounded-lg overflow-hidden shadow">
              <p className="flex space-between items-center font-medium text-gray-200">
                <label
                  htmlFor="prep_time"
                  className="block text-sm font-medium text-gray-200"
                >
                  Prep {clockOutlineIcon}
                </label>
                <input
                  type="number"
                  id="prep_time"
                  name="prep_time"
                  className="w-20 h-10  ml-2 rounded-md text-gray-700 text-4xl"
                  value={recipe?.prep_time ?? ""}
                  onChange={handleRecipeChange}
                />
              </p>

              <p className="flex space-between items-center font-medium text-gray-200">
                <label
                  htmlFor="cook_time"
                  className="block text-sm font-medium text-gray-200"
                >
                  Cook {clockOutlineIcon}
                </label>
                <input
                  type="number"
                  id="cook_time"
                  name="cook_time"
                  className="w-20 h-10  ml-2 rounded-md text-gray-700 text-4xl"
                  value={recipe?.cook_time ?? ""}
                  onChange={handleRecipeChange}
                />
              </p>

              <p className="flex space-between items-center font-medium text-gray-200">
                <label
                  htmlFor="serving_size"
                  className="block text-sm font-medium text-gray-200"
                >
                  Serving Size {peopleIcon}
                </label>
                <input
                  type="number"
                  id="serving_size"
                  name="serving_size"
                  className="w-20 h-10  ml-2 rounded-md text-gray-700 text-4xl"
                  value={recipe?.serving_size ?? ""}
                  onChange={handleRecipeChange}
                />
              </p>

              <p className="flex space-between items-center font-medium text-gray-200">
                <label
                  htmlFor="calorie_count"
                  className="block text-sm font-medium text-gray-200"
                >
                  Calorie Count {peopleIcon}
                </label>
                <input
                  type="number"
                  id="calorie_count"
                  name="calorie_count"
                  className="w-20 h-10  ml-2 rounded-md text-gray-700 text-4xl"
                  value={recipe?.calorie_count ?? ""}
                  onChange={handleRecipeChange}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="recipe_name"
            className="block text-sm font-medium text-gray-200"
          >
            Recipe Name:
          </label>
          <input
            type="text"
            id="recipe_name"
            name="recipe_name"
            className="w-[80%] rounded-md text-gray-700 text-4xl"
            value={recipe?.recipe_name || ""}
            onChange={handleRecipeChange}
          />
          <p className="mt-2 text-md text-gray-400">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-200"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="w-[80%] rounded-md text-gray-700 text-4xl"
              value={recipe?.description || ""}
              onChange={handleRecipeChange}
            ></textarea>
          </p>
        </div>
        <div className="flex mt-8 ">
          <div className="w-full flex flex-col xl:items-center text-gray-100  ">
            <div className="text-2xl">Meal Types:</div>
            <div>
              <ul>
                {mealTypeOptions?.length
                  ? mealTypeOptions.map((mt) => (
                      <li key={mt.id} className="capitalize">
                        <input
                          type="checkbox"
                          id="meal_types"
                          name="meal_types"
                          checked={recipe?.meal_types?.[mt.id] || false}
                          value={mt.id}
                          onChange={handleRecipeChange}
                        />
                        <label
                          htmlFor="meal_types"
                          className="text-sm font-medium text-gray-200"
                        >
                          {mt.meal_type_label}
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
              <div className="flex  items-center text-gray-100">
                <label
                  htmlFor="newMealType"
                  className="block text-sm font-medium text-gray-200 mr-2"
                >
                  New Meal Type:
                </label>
                <input
                  ref={newMealType}
                  type="text"
                  id="newMealType"
                  name="newMealType"
                  className="w-[50%] h-8 rounded-md text-gray-700 text-2xl"
                />
                <div className="ml-2" onClick={handleNewMealType}>
                  {addIconSmall}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col xl:items-center text-gray-100  ">
            <div className="text-2xl">Tag:</div>
            <div>
              <ul>
                {tagOptions?.length
                  ? tagOptions.map((t) => (
                      <li key={t.id} className="capitalize">
                        <input
                          type="checkbox"
                          id="tag"
                          name="tag"
                          checked={recipe?.tags?.[t.id] || false}
                          value={t.id}
                          onChange={handleRecipeChange}
                        />
                        <label
                          htmlFor="tag"
                          className="text-sm font-medium text-gray-200"
                        >
                          {t.tag_label}
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
              <div className="flex  items-center text-gray-100">
                <label
                  htmlFor="newTag"
                  className="block text-sm font-medium text-gray-200 mr-2"
                >
                  New Tag:
                </label>
                <input
                  ref={newTag}
                  type="text"
                  id="newTag"
                  name="newTag"
                  className="w-[50%] h-8 rounded-md text-gray-700 text-2xl"
                />
                <div className="ml-2" onClick={handleNewTag}>
                  {addIconSmall}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <label
            htmlFor="select"
            className="font-semibold block py-2 text-white text-2xl"
          >
            Ingredients:
          </label>

          <div className="relative">
            <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
              <input
                value={ingredientSearchTerm}
                name="ingredient_search_term"
                id="ingredient_search_term"
                className="px-4 appearance-none outline-none text-gray-800 w-full"
                onChange={handleIngredientSearchTermChange}
              />

              <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
                <svg
                  onClick={() => setIngredientSearchTerm("")}
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <label
                htmlFor="show_more"
                className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
              >
                <svg
                  onClick={() => setShowIngredientOptions((prev) => !prev)}
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </label>
            </div>

            <input
              type="checkbox"
              name="show_more"
              id="show_more"
              className="hidden peer"
            />
            <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
              {ingredientOptions?.length &&
              (showIngredientOptions || ingredientSearchTerm)
                ? ingredientOptions
                    .filter((io) =>
                      io?.ingredient_name
                        ?.toLowerCase()
                        .includes(ingredientSearchTerm.toLowerCase())
                    )
                    .map((i) => (
                      <div key={i.id} className="cursor-pointer group">
                        <div
                          className="capitalize block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                          onClick={() => handleIngredientMap(i)}
                        >
                          {i.ingredient_name}
                        </div>
                      </div>
                    ))
                : null}
            </div>
          </div>
        </div>

        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recipe?.ingredients
              ? Object.keys(recipe.ingredients).map((i: any, idx: number) => {
                  const ing = recipe.ingredients[i];
                  return (
                    <li
                      key={ing.id}
                      className="w-full flex items-center space-x-4 border-b-2 border-neutral-100 py-4 dark:border-white/10 text-gray-200"
                    >
                      <div className="capitalize">
                        {idx + 1}. {ing.label}:
                      </div>
                      <div className="flex space-between items-center font-medium text-gray-200">
                        <label
                          htmlFor={`ingredient-${ing.id}_quantity`}
                          className="block text-sm font-medium text-gray-200"
                        >
                          Quantity:
                        </label>
                        <input
                          type="number"
                          id={`ingredient-${ing.id}_quantity`}
                          name={`ingredient-${ing.id}_quantity`}
                          className="w-16 h-6  ml-2 rounded-md text-gray-700 text-xl"
                          value={ing.quantity || ""}
                          onChange={handleRecipeChange}
                        />
                      </div>
                      <div className="flex space-between items-center font-medium text-gray-200">
                        <label
                          htmlFor={`ingredient-${ing.id}_unit`}
                          className="block text-sm font-medium text-gray-200"
                        >
                          Unit:
                        </label>
                        <input
                          type="text"
                          id={`ingredient-${ing.id}_unit`}
                          name={`ingredient-${ing.id}_unit`}
                          className="w-16 h-6 ml-2 rounded-md text-gray-700 text-xl"
                          value={ing.unit || ""}
                          onChange={handleRecipeChange}
                        />
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>

        <div className="mt-8 flow-root">
          <div className="text-2xl text-gray-100">Steps:</div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recipe?.recipe_steps
              ? Object.keys(recipe.recipe_steps).map((skey, idx) => (
                  <li
                    key={skey}
                    className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 text-gray-200"
                  >
                    <div className="capitaliz flex w-full">
                      <div className="text-4xl pr-4">{idx + 1} </div>
                      <div className="capitaliz flex flex-col flex-grow">
                        <p className="font-bold">
                          {recipe.recipe_steps[skey].title}
                        </p>
                        <p>{recipe.recipe_steps[skey].body}</p>
                      </div>
                      <div onClick={() => handleRemoveStep(parseInt(skey))}>
                        {closeIcon}
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
          <div className="mt-4">
            <label
              htmlFor="step-title"
              className="block text-sm font-medium text-gray-200"
            >
              Step Title:
            </label>
            <input
              ref={newStepTitle}
              type="text"
              id="step-title"
              name="step-title"
              className="w-full rounded-md text-gray-700 text-4xl"
            />
            <p className="mt-2 text-md text-gray-400">
              <label
                htmlFor="step-body"
                className="block text-sm font-medium text-gray-200"
              >
                Step Details:
              </label>
              <textarea
                ref={newStepBody}
                id="step-body"
                name="step-body"
                className="w-full rounded-md text-gray-700 text-4xl"
              ></textarea>
            </p>
            <button
              className="w-full rounded-lg bg-slate-200 active:scale-95 ease-in-out duration-75 "
              onClick={handleNewStep}
            >
              Add Step
            </button>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="text-2xl text-gray-100">Notes:</div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recipe?.notes
              ? Object.keys(recipe.notes).map((nkey, idx) => (
                  <li
                    key={nkey}
                    className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 text-gray-200"
                  >
                    <div className="capitaliz flex w-full">
                      <div className="text-4xl pr-4">{idx + 1} </div>
                      <div className="capitaliz flex flex-col flex-grow">
                        <p className="font-bold">{recipe.notes[nkey].title}</p>
                        <p>{recipe.notes[nkey].body}</p>
                      </div>
                      <div onClick={() => handleRemoveNote(parseInt(nkey))}>
                        {closeIcon}
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
          <div className="mt-4">
            <label
              htmlFor="step-title"
              className="block text-sm font-medium text-gray-200"
            >
              Note Title:
            </label>
            <input
              ref={newNoteTitle}
              type="text"
              id="step-title"
              name="step-title"
              className="w-full rounded-md text-gray-700 text-4xl"
            />
            <p className="mt-2 text-md text-gray-400">
              <label
                htmlFor="step-body"
                className="block text-sm font-medium text-gray-200"
              >
                Note Body:
              </label>
              <textarea
                ref={newNoteBody}
                id="step-body"
                name="step-body"
                className="w-full rounded-md text-gray-700 text-4xl"
              ></textarea>
            </p>
            <button
              className="w-full rounded-lg bg-slate-200 active:scale-95 ease-in-out duration-75 "
              onClick={handleNewNote}
            >
              Add Note
            </button>
          </div>

          <button
            className="w-full h-10 mt-6 font-bold rounded-lg bg-lime-500 active:scale-95 ease-in-out duration-75 "
            onClick={handleSaveRecipe}
          >
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
