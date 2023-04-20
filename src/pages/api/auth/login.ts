import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { User } from '@/types/user';
import users from '@/data/user';

type Response =
  | {
      user: Omit<User, 'password'>;
      accessToken: string;
      refreshToken: string;
    }
  | string;

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { email, password } = req.body;
  const [user] = users.filter((user) => user.email === email);

  if (!user) {
    res.status(401).json('Bad email');
  }

  if (user.password !== password) {
    res.status(401).json('Bad password');
  }

  try {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1m',
      issuer: 'Auth Pattern Server',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: '24h',
      issuer: 'Auth Pattern Server',
    });

    res.status(200).json({
      user: payload,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
}
