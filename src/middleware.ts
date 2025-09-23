import { NextResponse, NextRequest } from 'next/server';
import { authMiddleware } from './utils/middlewares/auth.middleware';

export function middleware(request: NextRequest) {
    return authMiddleware(request);
}

export const config = {
    matcher: ['/((?!.*\\..*|_next|login).*)', '/', '/(api|trpc)(.*)'],
};
