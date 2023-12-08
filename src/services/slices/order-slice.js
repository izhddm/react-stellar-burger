import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order:{
      number:null
    },
    name: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order.number = action.payload.order.number;
      state.name = action.payload.name;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
