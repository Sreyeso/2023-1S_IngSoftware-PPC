import DBO from '@/lib/utils/dbo';
import UserModel from '@/lib/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'

export async function connection(body:any){
  try {
    //Database object
    const DB:DBO=new DBO();

    //User data object
    const UDO=new UserModel(DB.db);
    await UDO.addCoins("bingus",parseInt(body.coins));
    await UDO.addGems("bingus",parseInt(body.gems));
    await UDO.setScore("bingus",parseInt(body.score));
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
      connection(body);
      res.status(200).json({ message: `Entry successfully updated` })

    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Api gaming'})
  }
}