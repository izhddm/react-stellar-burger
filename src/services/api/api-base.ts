import {FetchArgs, createApi, fetchBaseQuery, BaseQueryApi} from '@reduxjs/toolkit/query/react';
import {ExtendedErrorResponse, UpdateTokenResponse} from "../../types/server-response-types";
import type {BaseQueryFn} from '@reduxjs/toolkit/query'

export const baseUrl = 'https://norma.nomoreparties.space/api';

const fetchWithTokenRefresh:BaseQueryFn  = async (args: FetchArgs, api: BaseQueryApi, extraOptions = {}) => {
  let result = await fetchBaseQuery({baseUrl})(args, api, extraOptions);

  const statusCode = result?.error?.status;

  if (statusCode === 403 || statusCode === 401) {
    const errorMessage = result.error && result.error.data && typeof result.error.data === 'object' && ('message' in result.error.data ? result.error.data.message : null);

    if (errorMessage === 'jwt expired' || errorMessage === 'You should be authorised') {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const refreshResult = await api.dispatch(apiBase.endpoints?.refreshToken.initiate(refreshToken));

        if ('data' in refreshResult && refreshResult.data.success) {
          result = await fetchBaseQuery({baseUrl})({
            ...args,
            headers: {Authorization: refreshResult.data.accessToken},
          }, api, extraOptions);
        } else {
          console.error('Не удалось обновить токен:', refreshResult);
        }
      }
    }
  }

  return result;
};

export const apiBase = createApi({
  reducerPath: 'api',
  baseQuery: fetchWithTokenRefresh as BaseQueryFn<FetchArgs, unknown, ExtendedErrorResponse>,
  endpoints: (builder) => ({
    refreshToken: builder.mutation<UpdateTokenResponse, string>({
      query: (args) => ({
        url: 'auth/token',
        method: 'POST',
        body: {
          'token': args
        }
      }),
      transformResponse: (response: UpdateTokenResponse) => {
        if (response.success) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
      },
      // transformErrorResponse: (response: ExtendedErrorResponse) => {
      //   // Добавим дополнительные поля, если их нет
      //   const extendedError: ExtendedErrorResponse = {
      //     ...response,
      //     data: {
      //       success: response.data?.success ?? false,
      //       message: response.data?.message ?? "Ошибка обновления токена",
      //     },
      //   };
      //
      //   console.log('Ошибка запроса: ', extendedError);
      //
      //   return extendedError;
      // }
    }),
  }),
});

export const {useRefreshTokenMutation} = apiBase;
