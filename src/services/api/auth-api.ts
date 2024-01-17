import {apiBase} from "./api-base";
import {SuccessLoginResponse, SuccessLogoutResponse} from "../../types/server-response-types";
import {UserLoginReques} from "../../types/types";

export const authApi = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SuccessLoginResponse, UserLoginReques>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body
      }),
      transformResponse: (response: SuccessLoginResponse) => {
        // Проверяем, что вернулась модель с success:true
        if (response.success) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
      },
    }),
    logout: builder.mutation<SuccessLogoutResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: {'token': localStorage.getItem('refreshToken') ?? undefined}
      }),
      transformResponse: (response: SuccessLogoutResponse) => {
        if (response.success) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }

        return response;
      },
    }),
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
} = authApi;
