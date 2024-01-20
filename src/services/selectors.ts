import {TIngredient} from "../types/types";
import {RootState} from "./store/store";
import {useGetIngredientsQuery} from "./api/ingredient-api";

export const getCountIngredientFromConstructor = (element: TIngredient) => (state: RootState) => {
  if (state.burger.bun && element._id === state.burger.bun._id) {
    return 2;
  }

  return state.burger.ingredients.reduce((acc, ingredient) => (ingredient._id === element._id ? acc + 1 : acc), 0);
}

// Возвращает ингредиент, либо из стейта, либо находит по id среди всех ингредиентов
export const getDetailIngredient = (id: string | undefined) => (state: RootState) => {
  if (state.modal.data) {
    return state.modal.data as TIngredient;
  }

  const {data: ingredients} = useGetIngredientsQuery(); // Получения списка ингредиентов

  return ingredients?.find((el) => el._id === id) ?? null;
}
