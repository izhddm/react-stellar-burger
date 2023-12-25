import {api} from "./api";

export const ingredientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => 'ingredients',
    }),
  })
});

export const {useGetIngredientsQuery} = ingredientApi;
