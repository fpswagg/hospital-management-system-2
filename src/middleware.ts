import { createClient } from '~/utils/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    // const res = NextResponse.next(req);
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user && req.nextUrl.pathname.startsWith('/dashboard'))
        return NextResponse.redirect(new URL('/login', req.url));

    if (!user && req.nextUrl.pathname.startsWith('/profile'))
        return NextResponse.redirect(new URL('/login', req.url));

    // return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'],
};

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//          */
//         '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//     ],
// };
