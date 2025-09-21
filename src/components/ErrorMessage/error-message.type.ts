import { FieldErrors, FieldValues } from 'react-hook-form';

export type errorMessageType<T extends FieldValues> = {
    errors: FieldErrors<T>;
    field: keyof T;
};