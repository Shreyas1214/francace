import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const publicRoutes = ['/login', '/signup'];
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function verifySession(cookie) {
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // Get session from cookie
  const cookie = request.cookies.get('session')?.value;
  const session = await verifySession(cookie);

  // Redirect to login if accessing protected route without session
  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to dashboard if logged in user visits login/signup
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};
