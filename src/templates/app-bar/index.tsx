import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';

import { LogoIcon, Loader } from '@/components';
import { AppRoutes } from '@/constants/router.ts';
import { useAppDispatch } from '@/store/hooks';
import { useGetUserQuery } from '@/store/services/auth';
import { setUser } from '@/store/features/user';

export const AppBar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserQuery(undefined, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
    navigate(AppRoutes.LOGIN);
  };

  return (
    <>
      <Navbar maxWidth="full" className="shadow bg-secondary-300">
        <NavbarBrand className="max-w-[200px]">
          <LogoIcon onClick={() => navigate(AppRoutes.PHOTO_GALLERY)} className="cursor-pointer" />
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button className="font-bold text-secondary-700" onClick={logout}>
            Logout
          </Button>
        </NavbarContent>
      </Navbar>
      <div className="h-[calc(100vh-64px)]">{isLoading ? <Loader /> : <Outlet />}</div>
    </>
  );
};
