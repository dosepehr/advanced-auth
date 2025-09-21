import { JWTPayload, SignJWT } from 'jose';
import { UserSession } from '../types/DTO/auth.interface';

const JWT_SECRET = 'sfTN7a5l+5mmGZfPMUnHSvNqJepyk+K+kWfWkQkkDAQ='; //  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function encryptSession(session: UserSession): Promise<string> {
    return new SignJWT(session as unknown as JWTPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(encodedKey);
}
