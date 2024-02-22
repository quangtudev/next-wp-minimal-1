import { NextResponse } from 'next/server';

export function middleware(req) {
    let ua = req.headers.get('user-agent');
    if(ua.includes('facebookexternalhit') || ua.includes('facebookcatalog')){
        return NextResponse.next();
    } else {
        const targetURL = `${process.env.WORDPRESS_REDIRECT_DOMAIN}/${req.nextUrl.pathname.replace('/posts/', '')}`;
        return NextResponse.redirect(targetURL);
    }   
}
