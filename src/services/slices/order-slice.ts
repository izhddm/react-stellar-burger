import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TOrder} from "../../types/types";

export const initialState: TOrder = {
  order: {
    number: null
  },
  name: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, {payload}: PayloadAction<TOrder>) => {
      return {...state, ...payload}
    },
  },
});

export const {setOrder} = orderSlice.actions;
export default orderSlice.reducer;
