'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import React, { useEffect, useTransition } from 'react';
import { Mobile, mobileSchema } from '../_schemas/mobile.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { sendOtpAction } from '../_actions/signup.action';
import { toast } from 'sonner';
import { handleProblem } from '@/utils/api/error-client';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

const SignupForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    useEffect(() => {
        cookies.remove('mobile');
    }, []);
    const cookies = new Cookies();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Mobile>({
        resolver: zodResolver(mobileSchema),
    });
    const onSubmit = (data: Mobile) => {
        startTransition(async () => {
          const res = await sendOtpAction(data);
          if (res.isSuccess) {
            cookies.set('mobile', data.mobile_number);
            toast.success('done');
            router.push('/verify'); // ✅ no transition needed
          } else {
            handleProblem(res);
          }
        });
      };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2 items-center justify-center min-h-screen'
        >
            <Input {...register('mobile_number')} />
            <ErrorMessage errors={errors} field='mobile_number' />
            <Button shape='block' type='submit' isLoading={isPending}>
                confirm
            </Button>
        </form>
    );
};

export default SignupForm;
