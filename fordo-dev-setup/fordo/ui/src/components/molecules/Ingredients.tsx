import IngredientItem from "./IngredientItem";

type IngredientsPropType = {
  ingredients: Ingredient[];
};
const Ingredients = ({ ingredients }: IngredientsPropType) => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <h1 className="flex items-center justify-center mb-6 text-4xl text-gray-100">
        Ingredients
      </h1>
      <ul className="w-full max-h-[90%] overflow-auto">
        {ingredients
          ? ingredients.map((i, idx) => (
              <li key={i.id} className="w-full mb-4 border-b-1 border-gray-200">
                <IngredientItem idx={idx} ingredient={i} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Ingredients;
