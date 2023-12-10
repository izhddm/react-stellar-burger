import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  componentName: null,
  data: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:
      {
        setContentModal: (state, action) => {
          return {...state, ...action.payload}
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
