import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../lib/dynamodb';
import clientPromise from '../../../lib/mongodb';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
 ;
    const users = await db.collection('restaurants').find({}).toArray();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export default handler;
