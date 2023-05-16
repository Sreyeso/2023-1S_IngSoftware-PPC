//Aquí haremos el api endpoint para manejar los datos
//enviados de registro de usuarios

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

interface ProperUser{
  username: string,
  email: string,
  gender: string,
  country: string,
  password: string,
  rep_password: string
}

type KeyProperUser = keyof ProperUser

const countries = [ //Provisional
  "Albania", "Andorra", "Angola", "Bélgica", "Colombia", "España", "Myanmar"
]
const genders = [
  "Femenino", "Masculino", "Otro"
]

let users = [] //Provisional. Arreglo con los usuarios creados

const required_fields = [
  "username","email","gender","country","password","rep_password"
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method==="GET"){
      const response = [countries, genders]  
      res.status(200).end(JSON.stringify(response));
    }
    else if(req.method==="PUT"){
      let user_received;
      try{
        user_received = JSON.parse(req.body);
      }catch(error){
        console.log (error)
        res.status(400).json({name: "Invalid Request"});
      }
      
      let validation = validate_data(user_received);
      let code = validation[0];
      let message = validation[1];

      console.log(users)
      
      res.status(code).json({name: message});
    }
  
}

function validate_data(user_received: ProperUser): [number,string]{
  console.log(user_received);
  //Validamos los datos, y devolvemos un código http junto con un mensaje para el cliente

  //Si alguno de los datos recibidos no es un String, convertirlo en un string
  for (let field in user_received){
    let actual_field = user_received[field as KeyProperUser];
    user_received[field as KeyProperUser] = actual_field.toString();
  }

  //Verificar si el objeto enviado sí tiene las llaves requeridas:
  for(let field=0; field<required_fields.length; ++field){
    if(!Object.hasOwn(user_received, required_fields[field])){
      return [400, "Invalid Request"];
    }
  }

  //Verificar si hay algún campo en blanco:
  for (let field in user_received){
    if(user_received[field as KeyProperUser] === ""){
      return [409, "Se debe llenar todo el formulario"];
    };
  }
  
  //Quitar los espacios en blanco en ambos extremos de usuario y mail:
  user_received.username = user_received.username.trim();
  user_received.email = user_received.email.trim();

  let {username, email, gender, country, password, rep_password } = user_received;

  if(username.includes(" ")){
    return [409, "El nombre de usuario no puede contener espacios en blanco"];
  }

  if(username.length < 4){
    return [409, "El nombre de usuario debe tener más de cuatro carácteres"];
  }

  //Validación del email:
  const re: RegExp = /([a-z]|[A-Z]|\d|[!#$%&'*+-/=?^_`{|}~])+@/
  const email_address = "s@"
  const valid_address = email.match(re);
  if(!valid_address){
    console.log("WOWW");
    return [409,"Dirección de correo electrónico inválida"];
  }else{
    console.log(re);
  }
  
  users.push(user_received);
  return [200, "Usuario creado"];

}
