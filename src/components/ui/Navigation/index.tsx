'use client';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { useSessionStore } from '@/utils/store/auth.store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const Navigation = () => {
    const status = useSessionStore((state) => state.status);
    const session = useSessionStore((state) => state.session);
    if (status == 'loading') {
        return <Loading />;
    }
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
                <p className='text-red-500'>logout</p>
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
