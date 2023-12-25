import {api} from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (arg) => ({
        url: 'auth/login',
        method: 'POST',
        body: arg
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
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: {'token': localStorage.getItem('refreshToken')}
      }),
      transformResponse: (response) => {
        // Проверяем, что вернулась модель с success:true
        if (response?.success) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }

        return response;
      },
    }),
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
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;
