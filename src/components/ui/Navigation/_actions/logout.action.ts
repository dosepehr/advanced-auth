'use server';
import api from '@/utils/api';
import { decryptSession } from '@/utils/funcs/session';
import { UserSession } from '@/utils/types/DTO/auth.interface';
import { cookies } from 'next/headers';

export async function logoutAction() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('adv-session')?.value;
    if (!sessionCookie) {
        return null;
    }
    const session = (await decryptSession(
        sessionCookie
    )) as unknown as UserSession;
    try {
        await api.auth.logout({
            sessionId: session.sessionId,
        });
        cookieStore.delete('adv-session');
        return {
            isSuccess: true,
        };
    } catch (err) {
        return {
            isSuccess: false,
        };
    }
}
