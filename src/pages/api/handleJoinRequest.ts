//Aquí haremos el api endpoint para manejar los datos
//enviados de registro de usuarios

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
// const nodemailer = require('nodemailer')
import MailGen from 'mailgen'

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

interface User{ //El tipo de dato Usuario para ingresar en BD
  username: string,
  email: string,
  gender: string,
  country: string,
  password: string,  
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
"malparido",
"hijueputa",
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

let users: User[] =[] //Provisional. Arreglo con los usuarios creados

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
      
      let validation = saveUser(userReceived);
      let code = validation[0];
      let message = validation[1];
      let email = validation [2];

      console.log(users);

      res.status(code).json({name: message});

      if(code === 201 && email !== null){
        //Enviar mensaje de bienvenida:
        sendWelcomeMail(email);
      }
      
    }
  
}

function saveUser(userReceived: ProperUser): [number,string, string|null]{

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
      return [400, "Invalid Request",null];
    }
  }

  //Verificar si hay algún campo en blanco:
  for (let field in userReceived){
    if(userReceived[field as KeyProperUser] === ""){
      return [409, "Se debe llenar todo el formulario",null];
    };
  }
  
  //Quitar los espacios en blanco en ambos extremos de usuario y mail:
  userReceived.username = userReceived.username.trim();
  userReceived.email = userReceived.email.trim();

  let {username, email, gender, country, password, rep_password } = userReceived;

  if(username.includes(" ")){
    return [409, "El nombre de usuario no puede contener espacios en blanco", null];
  }

  if(username.length < 4 || username.length > 20){
    return [409, "El nombre de usuario debe tener entre de cuatro y veinte carácteres", null];
  }

  for(let insult=0; insult<insults.length; ++insult){
    let aux_username = username.toLowerCase();
    if(aux_username.includes(insults[insult])){
      return [409, "El nombre de usuario contiene algún insulto", null]
    }
  }

  //Validación del email:
  const email_format: RegExp = /^([a-z]|[A-Z]|\d|[!#$%&'*+-/=?^_`{|}~])+@([a-z]|[A-Z])+.([a-z]|[A-Z])+$/
  const valid_address = email.match(email_format);
  if(!valid_address){
    return [409,"Dirección de correo electrónico inválida", null];
  }

  //Mínimos de la contraseña:
  if(password.length<8){
    return [409, "La contraseña debe tener mínimo 8 carácteres", null]
  }
  const passwordFormat: RegExp = /(?=.*\d)(?=.*[A-Z])(?=.*\W)/
  if(!passwordFormat.test(password)){
    return [409, "La contraseña debe tener al menos un dígito, una mayúscula y un carácter especial", null]
  }

  if(password !== rep_password){
    return [409, "Las contraseñas deben coincidir", null];
  }

  //Ahora se deben hacer las validaciones en la BD

  //Crear el usuario para enviar a la BD

  //Mejorar la seguridad de la contraseña:
  //hashedPassword = hashFunc(password);
  let hashedPassword = password;
  
  //crear usuario para enviar:
  let user: User ={
    username: username,
    email: email,
    gender: gender,
    country: country,
    password: hashedPassword,      
  }

  users.push(user)
  
  //let userInserted = pushUserToBD() //Devuelve algún valor si hubo algún problema validando la BD
  return [201, "Usuario creado con éxito", email];

}

async function pushUserToBD(user: ProperUser){

}

function hashedPassword(password: string){

}

async function sendWelcomeMail(email: string){
  const EMAIL = process.env.PPC_MAIL_EMAIL;
  const PASSWORD = process.env.PPC_MAIL_PASSWORD;
  
  let config = { //Configuración de cómo se envian los mensajes!
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth : {
        user: EMAIL,
        pass: PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }      
  }

  // let transporter = 
}
