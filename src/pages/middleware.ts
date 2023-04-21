import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.headers
    .get('authorization')
    ?.split('Bearer ')[1];

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error) => {
    if (error) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  });
}

export const config = {
  matcher: '/users/*',
};
