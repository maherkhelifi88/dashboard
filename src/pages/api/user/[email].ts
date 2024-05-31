// pages/api/restaurants/[email].ts

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  if (typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const restaurantInfo = await db.collection('users').findOne({ email });

    if (!restaurantInfo) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurantInfo);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
