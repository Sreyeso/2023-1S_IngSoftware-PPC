import DBO from '@/lib/utils/dbo';
import UserModel from '@/lib/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'

export async function connection(body:any){
  let DB: DBO | null = null; // Initialize DB variable with null
  try {
    DB = new DBO();
    const UDO=new UserModel(DB.db);

    await UDO.addCoins("bingus",parseInt(body.coins));
    await UDO.addGems("bingus",parseInt(body.gems));
    await UDO.setScore("bingus",parseInt(body.score));

    return Promise.resolve();
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  } finally {
    if (DB !== null) {
      DB.end(); // Await the closing of the database connection
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  console.log(req.body);
  const body = req.body;
  let statusCode = 200;

  switch (requestMethod) {
    case 'POST':
      res.status(statusCode).json({ message: 'You submitted the following data: ss' });
      break;
    case 'PUT':
      try {
        await connection(body);
        res.status(statusCode).json({ message: 'Entry successfully updated' });
      } catch (error) {
        console.error(error);
        statusCode = 500; // Internal Server Error
        res.status(statusCode).json({ message: 'An error occurred' });
      }
      break;
    default:
      statusCode = 401; // Unauthorized
      res.status(statusCode).json({ message: 'Api gaming' });
      break;
  }
}