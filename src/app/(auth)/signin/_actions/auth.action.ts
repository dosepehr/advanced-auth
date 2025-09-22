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
import { decryptSession, encryptSession } from '@/utils/funcs/session';

export async function signinAction(dto: SignInSchema) {
    const headersList = headers();
    const userAgent = (await headersList).get('user-agent') || '';
    try {
        const user = await api.auth.signin({ ...dto, userAgent });
        await setAuthCookieAction(user);
        return {
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
    const encryptedSession = await encryptSession(session);

    cookieStore.set('adv-session', encryptedSession, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
}

export async function getSession(): Promise<UserSession | null> {
    const cookieStore = await cookies();
    try {
        const sessionCookie = cookieStore.get('adv-session')?.value;
        if (!sessionCookie) {
            return null;
        }
        const session = (await decryptSession(
            sessionCookie
        )) as unknown as UserSession;
        return session;
    } catch {
        return null;
    }
}
