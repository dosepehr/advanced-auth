import { decryptSession } from '@/utils/funcs/session';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const encryptedSession = cookieStore.get('adv-session')?.value || '';
    console.log(encryptedSession);
    const session = await decryptSession(encryptedSession);
    return Response.json(session);
}
