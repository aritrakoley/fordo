import { useRef } from "react";
import IngredientItem from "./IngredientItem";

type IngredientsPropType = {
  ingredients: Ingredient[];
};
const Ingredients = ({ ingredients }: IngredientsPropType) => {
  const quantity = useRef<HTMLInputElement>(null);
  const unit = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <h1 className="flex items-center justify-center mb-6 text-4xl text-gray-100">
        Ingredients
      </h1>
      <ul className="w-full max-h-[90%] overflow-auto">
        {ingredients
          ? ingredients.map((i, idx) => (
              <li key={i.id} className="w-full mb-4 border-gray-200 border-b-1">
                <IngredientItem idx={idx} ingredient={i} />
              </li>
            ))
          : null}
      </ul>
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="select" className="block py-2 text-gray-300">
            Select Ingredient:
          </label>

          <div className="relative">
            <div className="flex items-center h-10 bg-white border border-gray-200 rounded">
              <input
                name="select"
                id="select"
                className="w-full px-4 text-gray-800 outline-none appearance-none"
              />

              <button className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-gray-600">
                <svg
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
                className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-gray-600"
              >
                <svg
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
            <div className="hidden w-full mt-1 overflow-hidden bg-white border border-gray-200 rounded shadow peer-checked:flex-col peer-checked:flex">
              <div className="cursor-pointer group">
                <a className="block p-2 border-l-4 border-transparent group-hover:border-blue-600 group-hover:bg-gray-100">
                  Python
                </a>
              </div>
              <div className="border-t cursor-pointer group">
                <a className="block p-2 border-l-4 border-transparent border-blue-600 group-hover:border-blue-600 group-hover:bg-gray-100">
                  Javascript
                </a>
              </div>
              <div className="border-t cursor-pointer group">
                <a className="block p-2 border-l-4 border-transparent group-hover:border-blue-600 group-hover:bg-gray-100">
                  Node
                </a>
              </div>
              <div className="border-t cursor-pointer group">
                <a className="block p-2 border-l-4 border-transparent group-hover:border-blue-600 group-hover:bg-gray-100">
                  PHP
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-0 w-24 mb-10 group">
          <input
            ref={quantity}
            name="form_ingredient_quantity"
            id="form_ingredient_quantity"
            className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            placeholder=" "
          />
          <label
            htmlFor="form_ingredient_quantity"
            className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Quantity
          </label>
        </div>
        <div className="relative z-0 w-24 mb-10 group">
          <input
            ref={quantity}
            name="form_ingredient_unit"
            id="form_ingredient_unit"
            className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            placeholder=" "
          />
          <label
            htmlFor="form_ingredient_unit"
            className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Unit
          </label>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
