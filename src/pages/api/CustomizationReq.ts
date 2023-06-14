import DBO from '@/lib/utils/dbo';
import UserModel from '@/lib/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'

export async function connection(body:any){
  try {
    //Database object
    const DB:DBO=new DBO();

    //User data object
    const UDO=new UserModel(DB.db);
    await UDO.setAspect("bingus",body.skin,body.hat);

    DB.end();

    return Promise.resolve(); // Resolve the promise when the operations are completed
  } catch (e) {
    console.error(e);
    return Promise.reject(e); // Reject the promise if an error occurs
    //return null;
  }
  
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  console.log(req.body);
  const body = req.body;  
  switch (requestMethod) {
    case 'POST':
      res.status(200).json({ message: `You submitted the following data: ss` })
      break;
    case 'PUT':
      //const _DB=connection(body);
      connection(body);
      res.status(200).json({ message: `Entry successfully updated` })
      /*
      //added connection close, but it lacks proper handling of errors and conditions
      if(res.statusCode=200){
        _DB.end();
      }
      else{
        console.log("ERROR FETHCING USER DATA")
      }
      */

    // handle other HTTP methods
      break;
    default:
      res.status(401).json({ message: 'Api gaming'})
      break;
  }
}