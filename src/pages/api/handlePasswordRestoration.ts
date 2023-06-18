//El API endpoint usado para manejar la restauración de contraseñas

import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import nodemailer from 'nodemailer'
import UserModel from '@/lib/models/user'
import DBO from "@/lib/utils/dbo";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){   
    let dbo = new DBO().db;
    let userModel = new UserModel(dbo);

    if(req.method == "PUT"){
        let email
        try{
            email = req.body;
        }catch{
            console.log(error);
            res.status(400).json({name: "Invalid Request"});
        }
        console.log(email);
        
        const resp = await mailSending(email, userModel);
        const code: number = resp[0];
        const msg: string = resp[1];

        res.status(code).json({name: msg});
    }
};

async function mailSending(email: string, userModel: UserModel): Promise<[number,string]>{
    const email_format: RegExp = /^([a-z]|[A-Z]|\d|[!#$%&'*+-/=?^_`{|}~])+@([a-z]|[A-Z])+.([a-z]|[A-Z])+$/
    console.log(`ups ${email}`);
    const valid_address = email.match(email_format);    
    
    if(!valid_address){
        return [409, "Introduce un formato de email válido"];
    }

    const user = await userModel.verifyMail(email);
    console.log(user);
    if (user === null){
        return [409, "Ningún usuario tiene este email"];
    }
    
    const userUsername = user.UserName;
        
    //Credenciales del email de PPC
    const PPC_EMAIL = process.env.PPC_MAIL_EMAIL;
    const PPC_PASSWORD = process.env.PPC_MAIL_PASSWORD;

    //Dirección del logo de PPC
    const imagePath = path.join(__dirname,"..","..","..","..","public","backgrounds","logo_PPC.png");

    let config = { //Configuración de cómo se envian los mensajes
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth : {
            user: PPC_EMAIL,
            pass: PPC_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }      
    }

    let transporter = nodemailer.createTransport(config);

    const mail = `
    <h1>¿Y ese descuido? xdxdxd</h1>
    <div style="text-align: center; height: 340px">
        <img src="cid:logo_PPC.png" style="text-align:center; height: 80%" alt="Logo PPC"></img>
        
    </div>
    `;

    let message = {
        from: PPC_EMAIL,
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
    .catch(error => {
        console.log(error);
        return [500, "Error con el servidor. Intenta más tarde"];
    });

    return [200, "¡Se envió un correo de recuperación!"];

}
