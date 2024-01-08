import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    setUser: (state, {payload}: PayloadAction<TUser>) => {
      return {...state, ...payload}
    },
    setLoggedIn: (state, {payload}: PayloadAction<TIsLoggedIn>) => {
      return {...state, ...payload}
    },
    resetUser: () => {
      return {...initialState}
    }
  },
});

export const {setUser, resetUser, setLoggedIn} = userSlice.actions;
export default userSlice.reducer;
