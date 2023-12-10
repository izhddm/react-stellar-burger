import {configureStore} from '@reduxjs/toolkit'
import {api} from "../api";
import modalReducer from '../slices/modal-slice'
import burgerReducer from '../slices/burger-slice'
import orderReducer from '../slices/order-slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    burger: burgerReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
