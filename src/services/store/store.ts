import {configureStore} from '@reduxjs/toolkit'
import {apiBase} from "../api/api-base";
import modalReducer from '../slices/modal-slice'
import burgerReducer from '../slices/burger-slice'
import orderReducer from '../slices/order-slice'
import userReducer from '../slices/user-slice'

export const store = configureStore({
  reducer: {
    [apiBase.reducerPath]: apiBase.reducer,
    modal: modalReducer,
    burger: burgerReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBase.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
