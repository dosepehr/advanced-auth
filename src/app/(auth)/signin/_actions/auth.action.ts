'use server';
import api from '@/utils/api';
import { SignInSchema } from '../_schemas/signin.schema';
import { headers } from 'next/headers';

export async function signinAction(dto: SignInSchema) {
    const headersList = headers();
    const userAgent = (await headersList).get('user-agent') || '';
    try {
        const res = await api.auth.signin({ ...dto, userAgent });
        return {
            ...res,
            isSuccess: true,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
        };
    }
}
