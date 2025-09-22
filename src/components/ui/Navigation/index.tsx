'use client';
import { useSessionStore } from '@/utils/store/auth.store';
import React from 'react';
const Navigation = () => {
    const status = useSessionStore((state) => state.status);

    return (
        <div>
            <p>{status}</p>
        </div>
    );
};

export default Navigation;
