import { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex-col flex items-center justify-center">
      <p className="text-7xl font-bold">404</p>
      <p className="text-2xl font-medium">Page Not Found :(</p>
    </div>
  );
};

export default NotFoundPage;
