import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../lib/models/user'
import DBO from '../../lib/dbo'
import bcryptjs from 'bcryptjs' 
import { User } from 'next-auth'

type Data={ name:string }

interface credentials {
    userOrEmail:string,
    password:string,
}

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse<Data>) {
    let dbo = new DBO().db;
    let userModel = new UserModel(dbo);
    
    if(req.method === "POST"){    
        let dataReceived: credentials = {userOrEmail:"", password:""};
        try {
            dataReceived = JSON.parse(req.body);
        } catch (error) {
            console.log (error)
            res.status(400).json({name: "Invalid Request"});
        }
        const resp = await authentication(dataReceived, userModel);
        if(resp === 409)
            res.status(resp).json({name: "Credenciales incorrectas"})
        else
            res.status(resp).json({name: "Login existoso"});
    }

    if(req.method === "GET"){
        res.status(201).json({name: "PPC Fever"});
    }
}

async function authentication(dataReceived: credentials, userModel: UserModel): Promise<number>{
    // const userOrPass = dataReceived.userOrEmail.trim();
    const userOrEmail = dataReceived.userOrEmail;
    
    //Verificar si es un email:
    const email_format: RegExp = /^([a-z]|[A-Z]|\d|[!#$%&'*+-/=?^_`{|}~])+@([a-z]|[A-Z])+.([a-z]|[A-Z])+$/
    const isEmail = userOrEmail.match(email_format);

    //Ahora vamos a buscar en la base de datos
    let user;

    if(isEmail)
        user = await userModel.verifyMail(userOrEmail);
    else
        user = await userModel.getUser(userOrEmail);
    

    //No existe el usuario:
    if (user === null){ 
        return 409;
    }

    //Verificar las contraseñas:
    const hashedPassword = user.Password;
    const isPassword = bcryptjs.compareSync(dataReceived.password,hashedPassword);

    if (!isPassword)
        return 409;
    
    return 200;
}