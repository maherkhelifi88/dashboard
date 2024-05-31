import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { email, image } = req.body;

    if (!email || !image) {
      return res.status(400).json({ error: 'Email and image are required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      const result = await db.collection('users').updateOne(
        { email },
        { $set: { image } }
      );

      if (result.modifiedCount === 0) {
        throw new Error('Failed to update image');
      }

      res.status(200).json({ imageUrl: image });
    } catch (error) {
      console.error('Error updating user image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export const config = {
  api: {
    bodyParser: true, 
  },
};

export default handler;
