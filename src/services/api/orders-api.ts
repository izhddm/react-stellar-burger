import {apiBase} from "./api-base";
import {OrderResponse} from "../../types/server-response-types";


const wsBaseUrl = 'wss://norma.nomoreparties.space'

export const ordersApi = apiBase.injectEndpoints({
    endpoints: (builder) => ({
      getOrdersAll: builder.query<OrderResponse, void>({
        query: () => ({
          url: 'orders/all'
        }),
        async onCacheEntryAdded(_arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
          const ws = new WebSocket(`${wsBaseUrl}/orders/all`)
          try {
            await cacheDataLoaded

            // docs https://redux-toolkit.js.org/rtk-query/usage/streaming-updates#websocket-chat-api
            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data);

              updateCachedData(() => {
                return data;
              })
            }

            ws.addEventListener('message', listener)
          } catch {
          }

          await cacheEntryRemoved
          ws.close()
        },
      }),
      getMyOrders: builder.query<OrderResponse, void>({
        query: () => ({
          url: 'orders',
          headers: {
            'Authorization': localStorage.getItem('accessToken') ?? undefined
          }
        }),
        async onCacheEntryAdded(_arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
          const accessToken = localStorage.getItem('accessToken')?.slice(7);

          const ws = new WebSocket(`${wsBaseUrl}/orders?token=${accessToken}`)
          try {
            await cacheDataLoaded

            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data) as OrderResponse;

              if (data.success) {
                updateCachedData(() => {
                  return data;
                })
              }
            }

            ws.addEventListener('message', listener)
          } catch {
          }

          await cacheEntryRemoved
          ws.close()
        },
      })
    })
  }
);

export const {useGetOrdersAllQuery, useGetMyOrdersQuery} = ordersApi
