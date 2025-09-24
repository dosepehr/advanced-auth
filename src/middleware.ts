import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    console.log(path);
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\..*|_next|login).*)', '/', '/(api|trpc)(.*)'],
};