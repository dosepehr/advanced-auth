import { decryptSession } from '@/utils/types/funcs/session';
import { cookies } from 'next/headers';
import { UserSession } from '../signup/_schemas/mobile.schema';

export async function getSession(): Promise<UserSession | null> {
    const cookieStore = await cookies();
    try {
        const sessionCookie = cookieStore.get('session-cookie')?.value;
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
