import api from '@/utils/api';
import React from 'react';

const page = async () => {
    const res = await api.auth.getMe();
    console.log(res);
    return <div></div>;
};

export default page;
