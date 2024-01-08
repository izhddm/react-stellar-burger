import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://norma.nomoreparties.space/api';

const fetchWithTokenRefresh = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({baseUrl})(args, api, extraOptions);

  if (result?.error?.status === 403 && result?.error?.data.message === 'jwt expired') {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = api.dispatch(apiBase.endpoints.refreshToken.initiate(refreshToken));

      if (refreshResult.unsubscribe) {
        refreshResult.unsubscribe();
      }
      if (refreshResult.data?.success) {
        result = await fetchBaseQuery({baseUrl})({
          ...args,
          headers: {Authorization: refreshResult.data.accessToken},
        }, api, extraOptions);
      } else {
        console.error('Не удалось обновить токен:', refreshResult.error);
      }
    }
  }

  return result;
};

export const apiBase = createApi({
  reducerPath: 'api',
  baseQuery: fetchWithTokenRefresh,
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (args) => ({
        url: 'auth/token',
        method: 'POST',
        body: {
          'token': args
        }
      }), transformResponse: (response) => {
        if (response?.success) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
      },
    }),
  }),
});

export const {useRefreshTokenMutation} = apiBase;
