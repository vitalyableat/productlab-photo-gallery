import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppBar } from '@/templates/app-bar';
import { AppRoutes } from '@/constants/router.ts';
import { ProtectedRoute } from './components';
import { authGuard } from './utils';

const ErrorPage = lazy(async () => await import('@/pages/error'));
const LoginPage = lazy(async () => await import('@/pages/login'));
const NotFoundPage = lazy(async () => await import('@/pages/not-found'));
const PhotoDetailsPage = lazy(async () => await import('@/pages/photo-details'));
const PhotoGalleryPage = lazy(async () => await import('@/pages/photo-gallery'));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute guard={authGuard} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppBar />,
        children: [
          {
            path: AppRoutes.PHOTO_GALLERY,
            element: <PhotoGalleryPage />,
          },
          {
            path: AppRoutes.PHOTO_GALLERY_DETAILS,
            element: <PhotoDetailsPage />,
          },
          {
            element: <NotFoundPage />,
            path: AppRoutes.NOT_FOUND,
          },
          {
            path: '/',
            element: <Navigate to={AppRoutes.PHOTO_GALLERY} replace />,
          },
          {
            path: '*',
            element: <Navigate to={AppRoutes.NOT_FOUND} replace />,
          },
        ],
      },
    ],
  },
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
    errorElement: <div>Something went wrong :(</div>,
  },
  {
    path: '*',
    element: <Navigate to={AppRoutes.LOGIN} replace />,
  },
]);
