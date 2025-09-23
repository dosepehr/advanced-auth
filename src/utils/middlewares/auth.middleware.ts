import { NextRequest, NextResponse } from 'next/server';
import { decryptSession } from '../funcs/session';
import { UserSession } from '../types/DTO/auth.interface';

export const authMiddleware = async (request: NextRequest) => {
    const session = request.cookies.get('adv-session')?.value;
    const authRoutes = ['/signin'];
    const protectedRoutes = ['/dashboard'];
    const { nextUrl } = request;
    const signinRoute = request.nextUrl.clone();

    const nextResponse = NextResponse.next();

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    );

    if (!session) {
        if (isProtectedRoute) {
            const callbackUrl = encodeURIComponent(nextUrl.pathname);
            signinRoute.pathname = '/signin';
            return NextResponse.redirect(
                `${signinRoute}?callbackUrl=${callbackUrl}`
            );
        }
    }
    try {
        const parsedSession = (await decryptSession(
            session || ''
        )) as unknown as UserSession;
        const now = Date.now();
        const accessTokenExpired = parsedSession.exp < now;
        const refreshTokenExpired = parsedSession.sessionExpiry < now;
        
        if (!accessTokenExpired && !refreshTokenExpired && isAuthRoute) {
            const dashboardRoute = request.nextUrl.clone();
            dashboardRoute.pathname = '/dashboard/courses';
            return NextResponse.redirect(dashboardRoute);
        }
    } catch {
        return NextResponse.redirect(`${signinRoute}`);
    }

    return nextResponse;
};
