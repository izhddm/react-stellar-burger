import {createSlice} from '@reduxjs/toolkit';
import {TIsLoggedIn, TUser} from "../../types/types";


export type TUserState = TUser & TIsLoggedIn;

const initialState: TUserState = {
  email: '',
  name: '',
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
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
