import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '@/store/services';
import { AddCommentData, Comment } from './types.ts';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string | undefined>({
      query: (photoId) => `comments?photoId=${photoId}`,
      providesTags: ['Comments'],
    }),
    addComment: builder.mutation<Comment[], AddCommentData>({
      query: (body) => ({
        url: 'comments',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation<Comment[], number>({
      query: (commentId) => ({
        url: `comments/${commentId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation, useDeleteCommentMutation } = commentApi;
