import { UserSession } from '@/app/(auth)/signup/_schemas/mobile.schema';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = 'sfTN7a5l+5mmGZfPMUnHSvNqJepyk+K+kWfWkQkkDAQ='; //  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function encryptSession(session: UserSession): Promise<string> {
    return new SignJWT(session as unknown as JWTPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(encodedKey);
}

export async function decryptSession(session: string) {
    const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
    });
    return payload;
}
