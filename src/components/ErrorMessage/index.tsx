import React from 'react';
import { errorMessageType } from './error-message.type';
import { FieldValues } from 'react-hook-form';

const ErrorMessage = <T extends FieldValues>({
    errors,
    field,
}: errorMessageType<T>) => {
    const message = errors?.[field]?.message;
    return (
        <>
            {message && <p className='text-error text-sm mt-2'>{String(message)}</p>}
        </>
    );
};

export default ErrorMessage;