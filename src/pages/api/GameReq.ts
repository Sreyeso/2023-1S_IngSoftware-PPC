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
    return Promise.resolve(); // Resolve the promise when the operations are completed
  } catch (e) {
    console.error(e)
    return Promise.reject(e); // Reject the promise if an error occurs
  }
  
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  const body = req.body;  
  switch (requestMethod) {
    case 'POST':
      res.status(200).json({ message: `You submitted the following data: ss` });
      break;
    case 'PUT':
      connection(body)
      .then(() => {
        res.status(200).json({ message: `Entry successfully updated` });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: `Error updating entry` });
      });
      break;
    default:
      res.status(401).json({ message: 'Api gaming' });
  }
}