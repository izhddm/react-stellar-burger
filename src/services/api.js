import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => 'ingredients',
    }),
    createOrder: builder.mutation({
      query: (ids) => ({
        url: 'orders',
        method: 'POST',
        body: {ingredients: ids}
      })
    }),
    forgotPassword: builder.mutation({
      query: (request) => ({
        url: 'password-reset',
        method: 'POST',
        body: request
      })
    }),
    resetPassword: builder.mutation({
      query: (request) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: request
      })
    }),
    registerUser: builder.mutation({
      query: (request) => ({
        url: 'auth/register',
        method: 'POST',
        body: request
      })
    }),
    loginUser: builder.mutation({
      query: (arg) => ({
        url: 'auth/login',
        method: 'POST',
        body: arg
      })
    }),
    logoutUser: builder.mutation({
      query: (arg) => ({
        url: 'auth/logout',
        method: 'POST',
        body: arg
      })
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useCreateOrderMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation
} = api;
