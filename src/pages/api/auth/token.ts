import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

import activeUsers from '@/data/activeUser';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const refreshTokenCookie = cookies().get('refreshToken');

    if (!refreshTokenCookie) {
      return res.status(401).json('No refresh token cookie');
    }

    const { id } = jwt.verify(
      refreshTokenCookie.value,
      process.env.REFRESH_TOKEN_SECRET_KEY
    ) as JwtPayload;

    const activeUserIndex = activeUsers.findIndex(
      (user) => user.id === id
    );
    const user = activeUsers[activeUserIndex];

    if (!user || user.refreshToken !== refreshTokenCookie.value) {
      return res.status(401).json('Inactive user');
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: '1m',
        issuer: 'Auth Pattern Server',
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: '24h',
        issuer: 'Auth Pattern Server',
      }
    );

    activeUsers[activeUserIndex] = {
      ...user,
      refreshToken,
    };

    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; Max-Age=${
        24 * 60 * 60
      }; secure; httpOnly`
    );

    return res.status(200).json(accessToken);
  } catch (error) {
    return res.status(500).json(error);
  }
}
