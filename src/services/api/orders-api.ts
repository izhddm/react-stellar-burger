import {apiBase} from "./api-base";
import {OrderResponse} from "../../types/server-response-types";


const wsBaseUrl = 'wss://norma.nomoreparties.space'

export const ordersApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse, boolean>({
      query: (useToken) => {
        const url = useToken ? 'orders' : 'orders/all';
        const headers = useToken
          ? {'Authorization': localStorage.getItem('accessToken') ?? undefined}
          : undefined;

        return {
          url,
          headers,
        };
      },
      async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
        const accessToken = localStorage.getItem('accessToken')?.slice(7);

        const ws = new WebSocket(`${wsBaseUrl}/orders${arg ? `?token=${accessToken}` : '/all'}`);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data) as OrderResponse;

            if (data.success) {
              updateCachedData(() => {
                return data;
              });
            }
          };

          ws.addEventListener('message', listener);
        } catch {
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getOrder: builder.query<OrderResponse, string>({
      query: (id) => ({
        url: `orders/${id}`,
      }),
    }),
  }),
});

export const {useGetOrdersQuery, useGetOrderQuery} = ordersApi;
