import { NextResponse } from 'next/server';

export function middleware(req) {
    const targetURL = `${process.env.WORDPRESS_REDIRECT}/${req.nextUrl.pathname.replace('/posts/', '')}`;
    return NextResponse.redirect(targetURL);
}
