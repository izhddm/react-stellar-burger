import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://norma.nomoreparties.space/api';

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({baseUrl})(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = api.dispatch(apiBase.endpoints.refreshToken.initiate());
    const {data} = await refreshResult;

    refreshResult.unsubscribe();
    if (data?.success) {
      result = await fetchBaseQuery({baseUrl})({
        ...args,
        headers: {Authorization: data.accessToken}
      }, api, extraOptions);
    }
  }

  return result;
};

export const apiBase = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: () => ({
        url: 'auth/token',
        method: 'POST',
        body: {
          'token': localStorage.getItem('refreshToken')
        }
      }),
      transformResponse: (response) => {
        // Проверяем, что вернулась модель с success:true
        if (response?.success) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
      },
    }),
  }),
});

export const {} = apiBase; // Пример использования, замените на ваши эндпоинты
