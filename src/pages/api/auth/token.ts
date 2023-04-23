import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'querystring';
import { jwtVerify, SignJWT } from 'jose';

import { GetTokenResponse } from '@/types/api/auth';
import users from '@/data/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTokenResponse | string>
) {
  try {
    const cookies = qs.decode(req.headers.cookie || '', '; ');
    const refreshTokenCookie = cookies['refreshToken'];

    if (!refreshTokenCookie) {
      return res.status(200).json({ success: false });
    }

    const {
      payload: { id },
    } = await jwtVerify(
      `${refreshTokenCookie}`,
      new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY)
    );

    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(401).json('Invalid user');
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await new SignJWT(payload)
      .setProtectedHeader({ typ: 'JWT', alg: 'HS256' })
      .setExpirationTime('1m')
      .sign(
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY)
      );

    const refreshToken = await new SignJWT(payload)
      .setProtectedHeader({ typ: 'JWT', alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(
        new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY)
      );

    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; Max-Age=${
        24 * 60 * 60
      }; secure; httpOnly`
    );

    return res
      .status(200)
      .json({ success: true, token: accessToken });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
