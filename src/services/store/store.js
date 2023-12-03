import { configureStore } from '@reduxjs/toolkit'
import {api} from "../api";
import modalReducer from '../slices/modalSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
})
