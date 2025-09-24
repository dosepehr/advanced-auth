'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import React, { useTransition } from 'react';
import { Mobile, mobileSchema } from '../_schemas/mobile.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';

const SignupForm = () => {
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<Mobile>({
        resolver: zodResolver(mobileSchema),
    });
    const onSubmit = (data: Mobile) => {
        startTransition(async () => {
            console.log(data);
        });
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2 items-center justify-center min-h-screen'
        >
            <Input {...register('mobile_number')} />
            <ErrorMessage errors={errors} field='mobile_number' />
            <Button shape='block' type='submit'>
                confirm
            </Button>
        </form>
    );
};

export default SignupForm;
