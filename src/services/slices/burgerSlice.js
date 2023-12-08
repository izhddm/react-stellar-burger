import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
  bun: {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 20,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  },
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
    removeIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.uuid === action.payload.uuid
      );

      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
} = burgerSlice.actions;

export default burgerSlice.reducer;
