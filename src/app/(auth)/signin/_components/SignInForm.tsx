'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { SignInSchema, signInSchema } from '../_schemas/signin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { signinAction } from '../_actions/auth.action';
import { useSessionStore } from '@/utils/store/auth.store';
import { useRouter } from 'next/navigation';
const SignInForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    });
    const [isPending, startTransition] = useTransition();
    const updateSession = useSessionStore((state) => state.updateSession);
    const onSubmit = async (data: SignInSchema) => {
        startTransition(async () => {
            const response = await signinAction(data);
            if (response.isSuccess) {
                await updateSession();
                router.push('/dashboard/courses');
            }
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <Input placeholder='شماره موبایل' {...register('username')} />
            <ErrorMessage errors={errors} field='username' />
            <Input placeholder='رمز عبور' {...register('password')} />
            <ErrorMessage errors={errors} field='password' />
            <Button shape='block' type='submit' isLoading={isPending}>
                تایید
            </Button>
        </form>
    );
};

export default SignInForm;
