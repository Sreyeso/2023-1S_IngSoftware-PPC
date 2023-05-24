import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from 'Mega/lib/models/user'
import DBO from 'Mega/lib/dbo'
import bcryptjs from 'bcryptjs' 
type Data={ name:string }
interface credentials {
    email:string,
    password:string,
}
export default async function handler_login(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method === "POST"){
        let dataReceived: credentials;
        try {
            dataReceived = JSON.parse(req.body);
            let dbo = new DBO().db;
            let userModel = new UserModel(dbo);
            let respawn:[number,string] = [401,"usuario ó contraseña incorrectos"];
            await userModel.verifyMail(dataReceived.email)
            .then(dbResponse => {
                if(dbResponse !==null){
                    const hashedPassword = dbResponse.Password;
                    const isPassword = bcryptjs.compareSync(dataReceived.password,hashedPassword);
                    if(isPassword){
                        respawn = [200,"login exitoso"]
                    }
                }
                res.status(respawn[0]).json({name:respawn[1]})
            })
        } catch (error) {
            console.log (error)
            res.status(400).json({name: "Invalid Request"});
        }
    }
}