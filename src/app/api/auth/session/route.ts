import { decryptSession } from '@/utils/funcs/session';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const encryptedSession = cookieStore.get('adv-session')?.value || '';
    const session = await decryptSession(encryptedSession);
    return Response.json(session);
}
