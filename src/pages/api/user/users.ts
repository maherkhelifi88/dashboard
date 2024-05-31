import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db();
    console.log('Fetching users...');
    const users = await db.collection('users').find({}).toArray();
    console.log('Users fetched successfully');

    res.status(200).json({ users });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
