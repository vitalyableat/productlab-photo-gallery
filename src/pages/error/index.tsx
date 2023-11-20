import { FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="text-4xl font-bold">Something went wrong...</p>
    </div>
  );
};

export default ErrorPage;
