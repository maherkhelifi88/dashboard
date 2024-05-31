import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' });
}
