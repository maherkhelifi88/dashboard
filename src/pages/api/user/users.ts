import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../lib/dynamodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const params = {
      TableName: 'Users', 
    };
    const data = await dynamoDb.scan(params).promise();
    res.status(200).json({ users: data.Items });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export default handler;
