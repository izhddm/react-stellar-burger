import {apiBase} from "./api-base";
import {IngredientsResponse} from "../../types/server-response-types";

export const ingredientApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientsResponse, void>({
      query: () => (
        {
          url: 'ingredients'
        }
      ),
    }),
  })
});

export const {useGetIngredientsQuery} = ingredientApi;
