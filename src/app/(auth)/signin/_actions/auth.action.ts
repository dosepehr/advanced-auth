'use server'
import api from '@/utils/api';
import { SignInDTO } from '../_schemas/signin.schema';
import { headers } from 'next/headers';

export async function signinAction(dto: SignInDTO) {
    const headersList = headers();
    const userAgent = (await headersList).get('user-agent');
    try {
        const res = await api.auth.signin({ ...dto, userAgent });
        console.log(res);
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
        };
    }
}
