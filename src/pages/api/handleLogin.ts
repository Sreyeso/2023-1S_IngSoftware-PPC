import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '@/lib/models/user'
import SessionModel from '@/lib/models/session'
import DBO from "@/lib/utils/dbo";
import bcryptjs from 'bcryptjs' 
import { Credentials } from '@/authentication/variousTypes'
import { v4 as uuidv4 } from 'uuid'
import { getCookies } from 'cookies-next'

type Data={ name: string }

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse<Data>) {
    let dbo = new DBO().db;
    let userModel = new UserModel(dbo);
    let sessions = new SessionModel(dbo);
    
    if(req.method === "POST"){    
        let dataReceived: Credentials = {userOrEmail:"", password:""};
        try {
            dataReceived = JSON.parse(req.body);
        } catch (error) {
            console.log (error)
            res.status(400).json({name: "Invalid Request"});
        }
        const { status, username } = await authentication(dataReceived, userModel);
        if(status === 401 || username === null)
            res.status(status).json({name: "Credenciales incorrectas"})
        else{

            const sessionId: string = uuidv4(); //Obtener un id aleatorio para la sesión
            
            const ses = await sessions.addSession([username, sessionId])

            res.setHeader('Set-Cookie', `session=${sessionId}; Expires=24; path=/; HttpOnly; secure; SameSite=Strict`) //Esto le indicará al navegador que cree
            //una cookie con la sesión

            res.status(status).json({name: "Login exitoso!"});
        }
    }

    if(req.method === "GET")
        res.status(401).json({name: "PPC Games Joy"})

    if(req.method === "DELETE"){
        //Vamos a cerrar sesión

        const cooks = getCookies({req,res})
        const sesId = cooks.session;
        console.log(cooks)

        res.setHeader('Set-Cookie', `session=; Expires=Expires=Mon, 20 Mar 1967 00:00:00 GMT; path=/; HttpOnly; secure; SameSite=Strict`)
        res.status(201).json({name: "PPCGames"})


        if(sesId !== undefined){
            sessions.deleteSessionByHash(sesId)
        }

        const count = await sessions.count()
        console.log(count)
    }
    
}

async function authentication(dataReceived: Credentials, userModel: UserModel): Promise<{status:number, username: string|null}>{
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
    if (user === null)
        return {status: 401, username: null}
    

    //Verificar las contraseñas:
    const hashedPassword = user.Password;
    const isPassword = bcryptjs.compareSync(dataReceived.password,hashedPassword);

    if (!isPassword)
        return {status:401, username: null}
    
    return {status:200, username:user.UserName}
}
