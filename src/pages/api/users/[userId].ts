import type { NextApiRequest, NextApiResponse } from 'next';

import { GetProfileResponse } from '@/types/api/user';
import users from '@/data/user';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetProfileResponse | string>
) {
  try {
    const { userId } = req.query;

    const user = users.find(
      (user) => user.id === parseInt(userId as string, 10)
    );

    if (!user) {
      return res.status(404).json('Invalid user id');
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
