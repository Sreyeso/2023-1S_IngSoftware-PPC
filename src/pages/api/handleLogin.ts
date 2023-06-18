import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '@/lib/models/user'
import DBO from "@/lib/utils/dbo";
import bcryptjs from 'bcryptjs' 
import { Credentials } from '@/authentication/variousTypes'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

type Data={ name:string }

const sessionsPathFile = path.join(__dirname,"..","..","..","..","..","src","authentication","sessions.json")

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse<Data>) {
    let dbo = new DBO().db;
    let userModel = new UserModel(dbo);
    
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

            const sessions = fs.readFileSync(sessionsPathFile, 'utf-8');
            const sessionsJson = JSON.parse(sessions)

            sessionsJson[sessionId] = username

            const updatedSessions = JSON.stringify(sessionsJson, null, 2)
            fs.writeFileSync(sessionsPathFile, updatedSessions, 'utf-8')

            res.setHeader('Set-Cookie', `session=${sessionId}; Expires=24; path=/; secure; SameSite=Strict`) //Esto le indicará al navegador que cree
            //una cookie con la sesión

            res.status(status).json({name: "Login existoso"});
        }
    }

    if(req.method === "GET"){ //Para devolver si el usuario está o no logueado!
        // Miramos si el usuario está autenticado:
        
        if ("cookie" in req.headers === false)
            res.status(401).json({name: "No autenticado"})
        
        const cookies = req.headers["cookie"]
        const sessionId: string | undefined = cookies?.split("=")[1].split(";")[0] 
        if(!sessionId)
            res.status(401).json({name: "No autenticado"})
        else{
        //OJO. BUSCAR ALGUNA LIBRERÍA QUE HAGA ESTO POR Mí    
            
            const sessions = fs.readFileSync(sessionsPathFile, 'utf-8');
            const sessionsJson = JSON.parse(sessions)

            const session = sessionsJson[sessionId]

            if (!session)
                res.status(401).json({name: "No autenticado"})
            else
                res.status(201).json({name: session})    
        }
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