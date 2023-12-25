import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    resetUser: (state) => {
      state.email = '';
      state.name = '';
    }
  },
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;
