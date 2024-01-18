import {apiBase} from "./api-base";
import {FormForgotValues, FormResetValues, FormUserData} from "../../types/types";
import {
  SuccessForgotResponse,
  SuccessLoginResponse,
  SuccessRegistrationResponse,
  SuccessResetResponse
} from "../../types/server-response-types";

export const authApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<SuccessLoginResponse, void>({
      query: () => ({
        url: 'auth/user',
        headers: {
          'Authorization': localStorage.getItem('accessToken') ?? undefined
        }
      })
    }),
    updateUserInfo: builder.mutation<SuccessLoginResponse, Partial<FormUserData>>({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body,
        headers: {
          'Authorization': localStorage.getItem('accessToken') ?? undefined
        }
      })
    }),
    forgotPassword: builder.mutation<SuccessResetResponse, FormForgotValues>({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body
      })
    }),
    resetPassword: builder.mutation<SuccessForgotResponse, FormResetValues>({
      query: (body) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body
      })
    }),
    registerUser: builder.mutation<SuccessRegistrationResponse, FormUserData>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body
      }),
      transformResponse: (response: SuccessRegistrationResponse) => {
        if (response.success) {
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
