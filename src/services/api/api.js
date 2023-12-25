import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: () => ({}),
});
