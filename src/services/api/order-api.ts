import {apiBase} from "./api-base";
import {CreateOrderResponse} from "../../types/server-response-types";

export const orderApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, String[]>({
      query: (ids) => ({
        url: 'orders',
        method: 'POST',
        body: {ingredients: ids},
        headers: {
          'Authorization': localStorage.getItem('accessToken') ?? undefined
        }
      }),
    }),
  })
});

export const {useCreateOrderMutation} = orderApi;
