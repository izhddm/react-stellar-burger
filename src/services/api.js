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
    })
  }),
});

export const {useGetIngredientsQuery, useCreateOrderMutation} = api;
