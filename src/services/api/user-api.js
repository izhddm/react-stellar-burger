import {apiBase} from "./apiBase";

export const authApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: 'auth/user',
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
    }),
    updateUserInfo: builder.mutation({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body,
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
    }),
    forgotPassword: builder.mutation({
      query: (request) => ({
        url: 'password-reset',
        method: 'POST',
        body: request
      })
    }),
    resetPassword: builder.mutation({
      query: (request) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: request
      })
    }),
    registerUser: builder.mutation({
      query: (request) => ({
        url: 'auth/register',
        method: 'POST',
        body: request
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
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterUserMutation
} = authApi;
