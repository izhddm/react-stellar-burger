import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        contentModal: null,
    },
    reducers: {
        setContentModal: (state, action) => {
            state.contentModal = action.payload;
        },
        clearContentModal: (state) => {
            state.contentModal = null;
        },
    },
});

export const { setContentModal, clearContentModal } = modalSlice.actions;
export default modalSlice.reducer;
