import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TIngredients} from "../../types/types";

const initialState: TIngredients = [];

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (_state, {payload}: PayloadAction<TIngredients>) => {
      return payload;
    },
  },
});

export const {setIngredients} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
