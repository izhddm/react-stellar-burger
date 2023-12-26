import {apiBase} from "./apiBase";

export const orderApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (ids) => ({
        url: 'orders',
        method: 'POST',
        body: {ingredients: ids},
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
    }),
  })
});

export const {useCreateOrderMutation} = orderApi;
