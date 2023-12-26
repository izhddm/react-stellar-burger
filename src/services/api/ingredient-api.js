import {apiBase} from "./apiBase";

export const ingredientApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => 'ingredients',
    }),
  })
});

export const {useGetIngredientsQuery} = ingredientApi;
