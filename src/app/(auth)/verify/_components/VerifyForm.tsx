'use client';
import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import Input from '@/components/Input';
import React, { useTransition } from 'react';
import { VerifyDTO, verifySchema } from '../_schemas/verify.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { verifyMobileAction } from '../_actions/verify.action';
import { handleProblem } from '@/utils/api/error-client';

const VerifyForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const cookies = new Cookies();
    const mobile_number = cookies.get('mobile');
    if (!mobile_number) {
        router.push('/signup');
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyDTO>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            mobile_number,
        },
    });
    const onSubmit = (data: VerifyDTO) => {
        console.log(data);
        startTransition(async () => {
            const res = await verifyMobileAction(data);
            if (res.isSuccess) {
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
            <Input {...register('otp')} />
            <ErrorMessage errors={errors} field='otp' />
            <Button shape='block' type='submit' isLoading={isPending}>
                confirm
            </Button>
        </form>
    );
};

export default VerifyForm;
