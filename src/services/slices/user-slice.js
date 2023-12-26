import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    isLoggedIn: false
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    resetUser: (state) => {
      state.email = '';
      state.name = '';
      state.isLoggedIn = false;
    }
  },
});

export const {setUser, resetUser, setLoggedIn} = userSlice.actions;
export default userSlice.reducer;
