import type { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { RefreshTokenResponse } from '@/types/api/auth';
import users from '@/data/user';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefreshTokenResponse | string>
) {
  try {
    const { refreshToken } = req.body;
    const { id } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    ) as JwtPayload;
    const [{ password, ...payload }] = users.filter((user) => user.id === id);

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1m',
      issuer: 'Auth Pattern Server',
    });

    return res.status(200).json({
      user: payload,
      accessToken,
    });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
