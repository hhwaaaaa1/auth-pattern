import type { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT } from 'jose';

import { LoginResponse } from '@/types/api/auth';
import users from '@/data/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | string>
) {
  const { email, password } = JSON.parse(req.body);
  const [user] = users.filter((user) => user.email === email);

  if (!user) {
    return res.status(401).json('Bad email');
  }

  if (user.password !== password) {
    return res.status(401).json('Bad password');
  }

  try {
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

    return res.status(200).json({
      user: payload,
      token: accessToken,
    });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
