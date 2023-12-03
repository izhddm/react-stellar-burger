import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from "../utils/constants";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getIngredients: builder.query({
            query: () => 'ingredients',
        }),
    }),
});

export const {useGetIngredientsQuery} = api;
