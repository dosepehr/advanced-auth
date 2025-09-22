'use client';
import React, { useEffect } from 'react';
const Navigation = () => {
    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/auth/session');
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        };
        fetchSession();
    }, []);
    return <div></div>;
};

export default Navigation;
