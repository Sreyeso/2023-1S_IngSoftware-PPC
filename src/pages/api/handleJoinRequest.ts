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

const regions = [
  "Sudamérica",
  "Norteamérica Este", 
  "Norteamérica Oeste", 
  "Asia", 
  "Europa", 
  "África", 
  "Oceanía"
]
const genders = ["Femenino", "Masculino", "Otro"]
const insults = [
"Malparido",
"Hijueputa",
"puta",
"perra",
"zorra",
"cagar",
"folla",
"coge",
"tirar",
"culea",
"mata",
"fuck",
"bitch",
"idiota",
"gil",
"imbecil",
"marica",
"maricon",
"ano",
"pene",
"sexo",
"viola",
"abuso",
"rape",
"kill",
"assasin",
"asesino",
"pussy",
"ass",
"pija",
"verga",
"paja",
"teta",
"titt",
"hijodeputa",
"mama",
"chupa",
"culo",
"cabron",
"stupid",
"concha",
"logi",
]

let users: ProperUser[] =[] //Provisional. Arreglo con los usuarios creados

const required_fields = [
  "username","email","gender","country","password","rep_password"
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method==="GET"){
      const response = [regions, genders]  
      res.status(200).end(JSON.stringify(response));
    }
    else if(req.method==="PUT"){
      let userReceived;
      try{
        userReceived = JSON.parse(req.body);
      }catch(error){
        console.log (error)
        res.status(400).json({name: "Invalid Request"});
      }
      
      let validation = validate_data(userReceived);
      let code = validation[0];
      let message = validation[1];

      console.log(users)
      
      res.status(code).json({name: message});
    }
  
}

function validate_data(userReceived: ProperUser): [number,string]{
  console.log(userReceived);
  //Validamos los datos, y devolvemos un código http junto con un mensaje para el cliente

  //Si alguno de los datos recibidos no es un String, convertirlo en un string
  for (let field in userReceived){
    let actualField = userReceived[field as KeyProperUser];
    userReceived[field as KeyProperUser] = actualField.toString();
  }

  //Verificar si el objeto enviado sí tiene las llaves requeridas:
  for(let field=0; field<required_fields.length; ++field){
    if(!Object.hasOwn(userReceived, required_fields[field])){
      return [400, "Invalid Request"];
    }
  }

  //Verificar si hay algún campo en blanco:
  for (let field in userReceived){
    if(userReceived[field as KeyProperUser] === ""){
      return [409, "Se debe llenar todo el formulario"];
    };
  }
  
  //Quitar los espacios en blanco en ambos extremos de usuario y mail:
  userReceived.username = userReceived.username.trim();
  userReceived.email = userReceived.email.trim();

  let {username, email, gender, country, password, rep_password } = userReceived;

  if(username.includes(" ")){
    return [409, "El nombre de usuario no puede contener espacios en blanco"];
  }

  if(username.length < 4){
    return [409, "El nombre de usuario debe tener más de cuatro carácteres"];
  }

  for(let insult=0; insult<insults.length; ++insult){
    if(username.includes(insults[insult])){
      return [409, "El nombre de usuario contiene algún insulto"]
    }
  }

  //Validación del email:
  const email_format: RegExp = /^([a-z]|[A-Z]|\d|[!#$%&'*+-/=?^_`{|}~])+@([a-z]|[A-Z])+.([a-z]|[A-Z])+$/
  const valid_address = email.match(email_format);
  if(!valid_address){
    return [409,"Dirección de correo electrónico inválida"];
  }

  //Mínimos de la contraseña:
  if(password.length<8){
    return [409, "La contraseña debe tener mínimo 8 carácteres"]
  }
  const passwordFormat: RegExp = /(?=.*\d)(?=.*[A-Z])(?=.*\W)/
  if(!passwordFormat.test(password)){
    return [409, "La contraseña debe tener al menos un dígito, una mayúscula y un carácter especial"]
  }
  

  if(password !== rep_password){
    return [409, "Las contraseñas deben coincidir"];
  }
  
  users.push(userReceived);
  return [200, "Usuario creado con éxito"];

}
