import { FC } from 'react';

import { LogoIcon } from '@/components';
import { LoginForm } from './components';

const LoginPage: FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="hidden md:flex bg-secondary-300 min-w-fit w-1/3 h-full flex-col items-center justify-center p-5">
        <LogoIcon width={400} />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
