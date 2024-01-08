import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TIngredient} from "../../types/types";

interface ModalState {
  componentName: string | null,
  data: number | null | TIngredient
}

const initialState: ModalState = {
  componentName: null,
  data: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:
      {
        setContentModal: (state, {payload}: PayloadAction<ModalState>) => {
          return {...state, ...payload}
        },
        clearContentModal:
          () => {
            return {...initialState}
          },
      }
    ,
  })
;

export const {setContentModal, clearContentModal} = modalSlice.actions;
export default modalSlice.reducer;
