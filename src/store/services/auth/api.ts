import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '@/store/services';
import { LoginData, LoginResponse, User } from './types.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUser: builder.query<User, undefined>({
      query: () => 'auth',
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (body) => ({
        url: 'auth/login',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation } = authApi;
