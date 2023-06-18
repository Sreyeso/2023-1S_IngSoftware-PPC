import type { NextApiRequest, NextApiResponse } from 'next'
import SessionModel from '@/lib/models/session'
import DBO from "@/lib/utils/dbo";

type Data={ name: string | null}

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse<Data>) {
    let dbo = new DBO().db;
    let sessions = new SessionModel(dbo);

    if(req.method === "GET"){
        const sessionId = req.headers.id;
        let userSession
        // try{
            userSession = await sessions.getSessionHash(sessionId);
            res.status(200).json({name: userSession.userName})
        // }catch(err){
        //     console.log(err);
        //     res.status(500).json({name: "ServerError"})
        // }

    }
}