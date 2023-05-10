//Aquí haremos el api endpoint para manejar los datos
//enviados de registro de usuarios

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

let user_received:object={}

function validate_data(){
  //Verificar si hay algún campo en blanco:
  for (const property in user_received){
    if(user_received[property] === ""){
      return [409, "No se pueden dejar campos en blanco"]
    }
  }
  return [200, "Usuario creado"]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method==="GET"){
      res.status(200).json({ name: 'Rivers are green' })
    }
    else if(req.method==="PUT"){
      user_received = JSON.parse(req.body);
      console.log(user_received);
      let validation: (number|string)[] = validate_data();
      res.status(validation[0]).json({name: validation[1]});
    }
  
}