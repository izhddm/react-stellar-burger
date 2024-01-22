import {TIngredient} from "../types/types";
import {RootState} from "./store/store";

export const getCountIngredientFromConstructor = (element: TIngredient) => (state: RootState) => {
  if (state.burger.bun && element._id === state.burger.bun._id) {
    return 2;
  }

  return state.burger.ingredients.reduce((acc, ingredient) => (ingredient._id === element._id ? acc + 1 : acc), 0);
}
