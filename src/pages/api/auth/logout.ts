import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

import activeUsers from '@/data/activeUser';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const refreshTokenCookie = cookies().get('refreshToken');

    if (refreshTokenCookie) {
      const { id } = jwt.verify(
        refreshTokenCookie.value,
        process.env.REFRESH_TOKEN_SECRET_KEY
      ) as JwtPayload;

      const activeUserIndex = activeUsers.findIndex(
        (user) => user.id === id
      );

      activeUsers.splice(activeUserIndex, 1);
    }

    return res.status(200).json('Success');
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
