import {api} from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (ids) => ({
        url: 'orders',
        method: 'POST',
        body: {ingredients: ids}
      })
    }),
  })
});

export const {useCreateOrderMutation} = orderApi;
