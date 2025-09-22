import { NextResponse, NextRequest } from 'next/server';
import { authMiddleware } from './utils/middleware/auth.middleware';

export function middleware(request: NextRequest) {
    return authMiddleware(request);
    const cookie = request.cookies.get('adv-session');
    if (cookie && request.nextUrl.pathname.startsWith('/signin')) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard/courses';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\..*|_next|login).*)', '/', '/(api|trpc)(.*)'],
};
