import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IModalState} from "../../types/types";

export const initialState: IModalState = {
  componentName: null,
  data: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:
      {
        setContentModal: (state, {payload}: PayloadAction<IModalState>) => {
          return {...state, ...payload}
        },
        clearContentModal: (_state) => {
          return {...initialState}
        }
      }
    ,
  })
;

export const {setContentModal, clearContentModal} = modalSlice.actions;
export default modalSlice.reducer;
