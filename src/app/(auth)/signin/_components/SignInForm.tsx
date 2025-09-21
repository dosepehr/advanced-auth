import Button from '@/components/Button';
import Input from '@/components/Input';
import React from 'react';

const SignInForm = () => {
    return (
        <div>
            <Input placeholder='شماره موبایل' />
            <Input className='mt-4' placeholder='رمز عبور' />
            <Button className='mt-4' shape='block'>
                تایید
            </Button>
        </div>
    );
};

export default SignInForm;
