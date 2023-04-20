import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { RefreshTokenResponse } from '@/types/api/auth';
import users from '@/data/user';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefreshTokenResponse | string>
) {
  try {
    const refreshToken = cookies().get('refreshToken');

    if (!refreshToken) {
      return res.status(400).json('No refresh token');
    }

    const { id } = jwt.verify(
      refreshToken.value,
      process.env.REFRESH_TOKEN_SECRET_KEY
    ) as JwtPayload;

    const [{ password, ...payload }] = users.filter((user) => user.id === id);

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1m',
      issuer: 'Auth Pattern Server',
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: '1m',
        issuer: 'Auth Pattern Server',
      }
    );

    res.setHeader(
      'Set-Cookie',
      `refreshToken=${newRefreshToken}; secure; httpOnly`
    );

    return res.status(200).json({
      user: payload,
      accessToken,
    });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
