import {apiBase} from "./api-base";
import {TIngredients} from "../../types/types";

export const ingredientApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredients, void>({
      query: () => (
        {
          url: 'ingredients'
        }
      ),
      transformResponse: (response: { data: TIngredients }) => response.data
    }),
  })
});

export const {useGetIngredientsQuery} = ingredientApi;
