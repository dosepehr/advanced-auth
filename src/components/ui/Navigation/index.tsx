'use client';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { useSessionStore } from '@/utils/store/auth.store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useTransition } from 'react';
import { logoutAction } from './_actions/logout.action';
import { useRouter } from 'next/navigation';
const Navigation = () => {
    const status = useSessionStore((state) => state.status);
    const session = useSessionStore((state) => state.session);
    const clearSession = useSessionStore((state) => state.clearSession);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    if (status == 'loading') {
        return <Loading />;
    }
    const onSubmit = async () => {
        startTransition(async () => {
            const response = await logoutAction();
            if (response?.isSuccess) {
                clearSession();
                router.push('/');
            }
        });
    };
    if (status == 'authenticated') {
        return (
            <div>
                <Image
                    className='rounded-full'
                    src={session?.pic || ''}
                    alt=''
                    width={50}
                    height={50}
                />
                <p>{session?.fullName}</p>
                <p className='text-red-500 cursor-pointer' onClick={onSubmit}>
                    {isPending ? <Loading theme='error' /> : <p>logout</p>}
                </p>
            </div>
        );
    }
    return (
        <div>
            <Link href={'/signin'}>
                <Button>login</Button>
            </Link>
        </div>
    );
};

export default Navigation;
