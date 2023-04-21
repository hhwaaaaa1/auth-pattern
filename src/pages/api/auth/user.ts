import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtVerify } from 'jose';

import { GetUserResponse } from '@/types/api/auth';
import users from '@/data/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponse | string>
) {
  try {
    const token = req.headers.authorization!.split('Bearer ')[1];

    const {
      payload: { id },
    } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY)
    );

    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(401).json('Unauthorized');
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
