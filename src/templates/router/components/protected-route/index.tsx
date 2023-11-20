import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

type Props = {
  guard: () => string;
};

export const ProtectedRoute: FC<Props> = ({ guard }) => {
  const navigate = guard();
  return navigate ? <Navigate to={`../${navigate}`} /> : <Outlet />;
};
