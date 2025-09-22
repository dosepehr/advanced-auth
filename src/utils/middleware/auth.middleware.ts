import { NextRequest, NextResponse } from 'next/server';

export const authMiddleware = async (request: NextRequest) => {
    const session = request.cookies.get('adv-session')?.value;
    const authRoutes = ['/signin'];
    const protectedRoutes = ['/dashboard'];
    const { nextUrl } = request;
    const nextResponse = NextResponse.next();

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    );

    if (!session) {
        if (isProtectedRoute) {
            const callbackUrl = encodeURIComponent(nextUrl.pathname);
            const signinRequest = request.nextUrl.clone();
            signinRequest.pathname = '/signin';
            console.log(`${signinRequest}?callbackUrl=${callbackUrl}`);
            return NextResponse.redirect(
                `${signinRequest}?callbackUrl=${callbackUrl}`
            );
        }
    }
};
