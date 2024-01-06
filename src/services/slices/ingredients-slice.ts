import {createSlice} from '@reduxjs/toolkit';
import {TIngredients} from "../../types/types";

const initialState: TIngredients = [];

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      return action.payload;
    },
  },
});

export const {setIngredients} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
