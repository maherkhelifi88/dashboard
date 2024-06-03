import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../lib/dynamodb';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, about, customerLove, opportunities, videoParagraph, email } = req.body;

  if (!name || !about || !customerLove || !opportunities || !videoParagraph || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const params = {
      TableName: 'RestaurantsTable', // Replace with your DynamoDB table name
      Item: {
        email,
        name,
        about,
        customerLove,
        opportunities,
        videoParagraph,
        date: new Date().toISOString(),
        status: 'pending',
      },
    };

    await dynamoDb.put(params).promise();

    const userParams = {
      TableName: 'restaurants',
      Key: { email },
      UpdateExpression: 'set restaurant = :name',
      ExpressionAttributeValues: {
        ':name': name,
      },
    };

    await dynamoDb.update(userParams).promise();

    res.status(201).json({ message: 'Restaurant information added successfully' });
  } catch (error) {
    console.error('Add restaurant error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
