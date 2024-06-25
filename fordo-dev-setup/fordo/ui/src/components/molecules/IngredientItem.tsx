import React from "react";

type IngredientItemProp = { idx: number; ingredient: Ingredient };
const IngredientItem = ({ idx, ingredient }: IngredientItemProp) => {
  return (
    <div className="w-full flex mb-2 px-2">
      <div className="text-gray-300 text-2xl mr-2">{idx}.</div>
      <div className="text-gray-100 flex-1 text-2xl">
        {ingredient.ingredient_name}
      </div>
      <div className="text-gray-100 mr-1 text-2xl">{ingredient.quantity}</div>
      <div className="text-gray-400 text-2xl">{ingredient.unit}</div>
    </div>
  );
};

export default IngredientItem;
