import DBO from '@/lib/dbo';
import UserModel from '@/lib/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'

export async function connection(coins:number){
  try {
    //Database object
    const DB:DBO=new DBO();

    //User data object
    const UDO=new UserModel(DB.db);
    await UDO.addCoins("bingus",coins);
    //let userSkin=await 
    //retorno Objid, id in array, name ...
  } catch (e) {
    console.error(e)
  }
  
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  console.log(req.body);
  const body = req.body;  
  switch (requestMethod) {
    case 'POST':
      res.status(200).json({ message: `You submitted the following data: ss` })
    case 'PUT':
      connection(parseInt(body.coins));
      res.status(200).json({ message: `Entry successfully updated` })

    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Welcome to API Routes!'})
  }
}