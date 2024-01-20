import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {TIngredient, TIngredientConstructor} from "../../types/types";

interface IBurgerState {
  bun: TIngredient | null,
  ingredients: TIngredientConstructor[]
}

interface ISwapIngredient {
  indexFrom: number,
  indexTo: number,
  ingredient: TIngredientConstructor
}

interface IRemoveIngredient {
  uuid: string
}

const initialState: IBurgerState = {
  bun: null,
  ingredients: [],
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun: (state, {payload}: PayloadAction<TIngredient>) => {
      state.bun = payload;
    },
    addIngredient: {
      reducer: (state, {payload}: PayloadAction<TIngredientConstructor>) => {
        state.ingredients.push(payload);
      },
      prepare: (args: TIngredient) => {
        return {
          payload: {
            ...args,
            uuid: uuidv4(),
          }
        };
      },
    },
    swapIngredients: (store, {payload}: PayloadAction<ISwapIngredient>) => {
      const {indexFrom, indexTo, ingredient} = payload;

      store.ingredients.splice(indexFrom, 1);
      store.ingredients.splice(indexTo, 0, ingredient);

    },
    removeIngredient: (state, {payload}: PayloadAction<IRemoveIngredient>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.uuid === payload.uuid
      );

      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  swapIngredients,
  clearBurgerConstructor,
} = burgerSlice.actions;

export default burgerSlice.reducer;
