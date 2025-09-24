import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return <div className='min-h-screen max-w-md container'>{children}</div>;
};

export default layout;
