//Aquí haremos el api endpoint para manejar los datos
//enviados de registro de usuarios

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method==="GET"){
        res.status(200).json({ name: 'John Doe' })
    }
  
}