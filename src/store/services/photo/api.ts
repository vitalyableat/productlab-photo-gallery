import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { Photo, PhotoGallery } from './types.ts';

export const photoApi = createApi({
  reducerPath: 'photoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pexels.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', import.meta.env.VITE_PHOTO_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<PhotoGallery, string | undefined>({
      query: (query = 'curated?page=1&per_page=30') => query,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        const isSameData = currentCache.photos.some((photo) => newItems.photos.find(({ id }) => id === photo.id));
        if (!isSameData) {
          currentCache.photos.push(...newItems.photos);
          currentCache.next_page = newItems.next_page;
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getPhotoById: builder.query<Photo, string | undefined>({
      query: (photoId) => `photos/${photoId}`,
    }),
  }),
});

export const { useGetPhotosQuery, useGetPhotoByIdQuery } = photoApi;
