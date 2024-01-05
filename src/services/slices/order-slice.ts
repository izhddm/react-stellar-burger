import {createSlice} from '@reduxjs/toolkit';
import {TOrder} from "../../types/types";

const initialState: TOrder = {
  order: {
    number: null
  },
  name: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      return {...state, ...action.payload}
    },
  },
});

export const {setOrder} = orderSlice.actions;
export default orderSlice.reducer;
