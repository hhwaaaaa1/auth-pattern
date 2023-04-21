import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    res.setHeader('Set-Cookie', "refreshToken=''; Max-Age=-1");
    return res.status(200).json('Success');
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
