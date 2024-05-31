import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, newLink } = req.body;

  if (!email || !newLink) {
    return res.status(400).json({ message: 'Email and new link are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('users').findOneAndUpdate(
      { email },
      { $set: { link: newLink } },
      { returnDocument: 'after' }
    );

    if (result.value) {
      return res.status(200).json({ message: 'Link updated successfully', user: result.value });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update link error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
