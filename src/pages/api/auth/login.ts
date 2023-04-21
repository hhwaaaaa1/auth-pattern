import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { LoginResponse } from '@/types/api/auth';
import users from '@/data/user';
import activeUsers from '@/data/activeUser';

export default function handler(
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

    activeUsers.push({
      id: user.id,
      refreshToken,
    });

    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; Max-Age=${
        24 * 60 * 60
      }; secure; httpOnly`
    );

    return res.status(200).json({
      token: accessToken,
    });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
