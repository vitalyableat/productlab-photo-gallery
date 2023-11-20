import { AppRoutes } from '@/constants/router.ts';

export const authGuard = () => (localStorage.getItem('token') ? '' : AppRoutes.LOGIN);
