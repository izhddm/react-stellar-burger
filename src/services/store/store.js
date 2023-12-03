import {configureStore} from '@reduxjs/toolkit'
import {api} from "../api";
import modalReducer from '../slices/modalSlice'
import burgerReducer from '../slices/burgerSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    burger: burgerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
