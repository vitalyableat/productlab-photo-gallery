'use client';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

import { AppRoutes } from '@/constants';
import { Loader } from '@/components';
import { emailRegex } from '@/utils';
import { LoginData, useLoginMutation } from '@/store/services/auth';

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [login, { data, isLoading, isSuccess, isError }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({ defaultValues: { email: '', password: '' } });

  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isSuccess && data?.accessToken) {
      localStorage.setItem('token', data.accessToken);
      navigate(AppRoutes.PHOTO_GALLERY);
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="relative w-full md:w-2/3 h-full flex flex-col items-center justify-center gap-5">
      <p className="text-center md:text-xl lg:text-2xl font-bold mb-5">Welcome to Photo Gallery</p>
      <Input
        label="Email"
        {...register('email', {
          required: 'This field is required',
          pattern: { value: emailRegex, message: 'Invalid email' },
        })}
        errorMessage={errors.email?.message}
        variant="bordered"
        className="max-w-xs"
      />
      <Input
        type={visible ? 'text' : 'password'}
        label="Password"
        {...register('password', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Too short' },
        })}
        errorMessage={errors.password?.message}
        variant="bordered"
        className="max-w-xs"
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => setVisible((v) => !v)}>
            {visible ? (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Button color="secondary" className="font-bold" type="submit">
        Login
      </Button>
      {isLoading && <Loader />}
    </form>
  );
};
