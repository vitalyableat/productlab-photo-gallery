import { FC } from 'react';

import { Spinner } from '@nextui-org/spinner';

export const Loader: FC = () => {
  return (
    <div className="absolute top-0 left-0 flex w-full h-full justify-center items-center bg-default-100 bg-opacity-50 z-1000">
      <Spinner size="lg" color="secondary" />
    </div>
  );
};
