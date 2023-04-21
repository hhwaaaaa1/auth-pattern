import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.headers
    .get('authorization')
    ?.split('Bearer ')[1];

  if (!token) {
    return new NextResponse('No token', { status: 401 });
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY)
    );
  } catch (error: any) {
    if (error.code === 'ERR_JWT_EXPIRED') {
      return new NextResponse('Expired token', { status: 401 });
    }

    return new NextResponse('Bad token', { status: 401 });
  }
}

export const config = {
  matcher: '/api/auth/user',
};
