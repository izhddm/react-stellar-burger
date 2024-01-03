import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
  bun: null,
  ingredients: [],
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: args => {
        return {
          payload: {
            ...args,
            uuid: uuidv4(),
          }
        };
      },
    },
    swapIngredients: (store, action) => {
      const {indexFrom, indexTo, ingredient} = action.payload;

      store.ingredients.splice(indexFrom, 1);
      store.ingredients.splice(indexTo, 0, ingredient);

    },
    removeIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.uuid === action.payload.uuid
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
