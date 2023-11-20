import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { setUser } from '@/store/features/user';
import { AppRoutes } from '@/constants/router.ts';
import toast from 'react-hot-toast';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    toast.error(result.error.data as string);
    if (result.error.status === 401) {
      localStorage.clear();
      api.dispatch(setUser(null));
      window.location.pathname !== AppRoutes.LOGIN && window.location.replace(AppRoutes.LOGIN);
    }
  }
  return result;
};
