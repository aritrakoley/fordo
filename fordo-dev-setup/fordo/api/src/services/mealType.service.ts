import {
  MealType,
  MealTypeCreateRequest,
  MealTypeUpdateRequest,
} from "../types/mealType.types";

import * as mealTypeRepository from "../repository/mealType.repository";

export const createMealType = async (request: MealTypeCreateRequest) => {
  const mealType: Partial<MealType> = request;
  const [ok, result, error] = await mealTypeRepository.insertMealType(mealType);
  return [ok, result, error];
};

export const editMealType = async (request: MealTypeUpdateRequest) => {
  const mealType: Partial<MealType> = request;
  return await mealTypeRepository.updateMealType(mealType);
};

export const listMealType = async (request: { ids: number[] }) => {
  return await mealTypeRepository.listMealType(request.ids);
};
