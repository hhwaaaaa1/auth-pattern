import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    return res.status(200).json('Success');
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
