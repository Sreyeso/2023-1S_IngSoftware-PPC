//Aquí haremos el api endpoint para manejar los datos
//enviados de registro de usuarios

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import path from 'path'
import { defaultConfig } from 'next/dist/server/config-shared'
import UserModel from '../../lib/models/user'
import DBO from '@/lib/dbo'
import { Data, UserFromFrontend, KeyUserFromFrontend} from '@/lib/variousTypes'

type UserToSave = [string, string, string, string, string, number, number, number]

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
"assassin",
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

const required_fields = [
  "username","email","gender","region","password","rep_password"
];

export default async function handler(
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
      
      saveUser(userReceived)
      .then(response=>{
        let code = response[0];
        let message = response[1];
        let user = response [2];

        res.status(code).json({name: message});

        if(code === 201 && user !== null)
          sendWelcomeMail(user);
      })
    }
  
}

async function saveUser(userReceived: UserFromFrontend): Promise<[number, string, null | UserToSave]>{

  let dbo = new DBO().db;
  let userModel = new UserModel(dbo);

  // console.log(userReceived);
  
  //Validamos los datos, y devolvemos un código http junto con un mensaje para el cliente

  //Si alguno de los datos recibidos no es un String, convertirlo en un string
  for (let field in userReceived){
    let actualField = userReceived[field as KeyUserFromFrontend];
    userReceived[field as KeyUserFromFrontend] = actualField.toString();
  }

  //Verificar si el objeto enviado sí tiene las llaves requeridas:
  for(let field=0; field<required_fields.length; ++field){
    if(!Object.hasOwn(userReceived, required_fields[field])){
      return [400, "Invalid Request",null];
    }
  }

  //Verificar si hay algún campo en blanco:
  for (let field in userReceived){
    if(userReceived[field as KeyUserFromFrontend] === ""){
      return [409, "Se debe llenar todo el formulario",null];
    };
  }
  
  //Quitar los espacios en blanco en ambos extremos de usuario y mail:
  userReceived.username = userReceived.username.trim();
  userReceived.email = userReceived.email.trim();

  let {username, email, gender, region, password, rep_password } = userReceived;

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

  //Verificar que ni el usuario ni el correo estén en uso
  try{
    let userFromBD = await userModel.getUser(username);
    let userFromBDEmail = await userModel.verifyMail(email);
    if (userFromBD !== null)
      return [409, "El usuario ya está en uso", null];
    else if (userFromBDEmail !== null)
      return [409, "El email ya está en uso", null];
  }catch(error){
    console.log(error);
  }

  //Mejorar la seguridad de la contraseña:
  const numSalts = 10; //Cantidad de saltos
  const hashedPassword = bcryptjs.hashSync(password, numSalts);

  //Crear el usuario para enviar a la BD

  let user: UserToSave = [
    username,
    hashedPassword, 
    email,
    gender,
    region,
    0,0,0
  ]

  //Añadir el usuario a la BD
  try{
    const retUser = await userModel.addUser(user);
    return [201, "Usuario creado con éxito", user];
  }catch(error){
    console.log(error);
    return [500, "Error del servidor. Intenta de nuevo más tarde", null];
  }

}

async function sendWelcomeMail(user: UserToSave){
  
  const username = user[0];
  const email = user[2];

  //Credenciales del email de PPC:
  const EMAIL = process.env.PPC_MAIL_EMAIL;
  const PASSWORD = process.env.PPC_MAIL_PASSWORD;

  //Dirección del logo de PPC
  const imagePath = path.join(__dirname,"..","..","..","..","public","backgrounds","logo_PPC.png");
  
  let config = { //Configuración de cómo se envian los mensajes
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

  let transporter = nodemailer.createTransport(config);

  const mail = `
    <div style="background-color: #ffff99; border: solid 1px; margin: 0px;">
      <h1 style="text-align: center" >Hola ${username}</h1>
      <h2 style="text-align: center">Bienvenido a PPC Games</h2>
    </div>  
    <div style="background-color: #ffdd99; overflow: hidden; border: solid 1px; box-sizing: border-box; padding=10%;">
      <p style="font-size: 1rem; text-align: center;"><b>Muchas gracias por unirte a nuestra comunidad</b></p>
      <div style="text-align: center; height: 340px">
        <img src="cid:logo_PPC.png" style="text-align:center; height: 80%" alt="Logo PPC"></img>
      </div>
    </div>
    <footer>
      <h3 style="text-align: center">© PPC Team</h3>
    </footer>
  `;

  let message = {
    from: EMAIL,
    to: email,
    subject: "Bienvenido a PPC",
    html: mail,
    attachments: [{
      filename: 'logo_PPC.png',
      path: imagePath,
      cid: "logo_PPC.png" //same cid value as in the html img src
  }]
  }

  transporter.sendMail(message)
  .then(() => console.log("Correo Enviado"))
  .catch(error => console.log(error));
}
