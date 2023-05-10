//Aquí haremos el api endpoint para manejar los datos
//enviados de registro de usuarios

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

let user_received:{}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method==="GET"){
      res.status(200).json({ name: 'John Doe' })
    }
    else if(req.method==="PUT"){
      user_received = req.body;
      console.log(user_received);
      res.status(200).json({name: 'AJA'});
    }
  
}