'use server';
import api from '@/utils/api';
import { SignInSchema } from '../_schemas/signin.schema';
import { cookies, headers } from 'next/headers';
import {
    JWT,
    UserResponse,
    UserSession,
} from '@/utils/types/DTO/auth.interface';
import { jwtDecode } from 'jwt-decode';

export async function signinAction(dto: SignInSchema) {
    const headersList = headers();
    const userAgent = (await headersList).get('user-agent') || '';
    try {
        const user = await api.auth.signin({ ...dto, userAgent });
        await setAuthCookieAction(user);
        return {
            res: user,
            isSuccess: true,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
        };
    }
}

export async function setAuthCookieAction(user: UserResponse) {
    const decoded = jwtDecode<JWT>(user.accessToken);
    const session: UserSession = {
        username: decoded.username,
        fullName: decoded.fullName,
        pic: decoded.pic,
        exp: decoded.exp * 1000,
        accessToken: user.accessToken,
        sessionExpiry: user.sessionExpiry,
        sessionId: user.sessionId,
    };
    const cookieStore = await cookies();
    cookieStore.set('adv-session', JSON.stringify(session), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
}
