import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className='max-w-lg mx-auto h-screen flex items-center justify-center'>{children}</div>;
};

export default AuthLayout;
