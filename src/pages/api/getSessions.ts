import type { NextApiRequest, NextApiResponse } from 'next'
import SessionModel from '@/lib/models/session'
import DBO from "@/lib/utils/dbo";

type Data={ cookie: string | null, username: string | null}

export default async function getSessions(req: NextApiRequest, res: NextApiResponse<Data>) {
    let dbo = new DBO().db;
    let sessions = new SessionModel(dbo);

    if(req.method === "GET"){
        let sessionId = req.headers.id as string;
        let userSession
        try{

            userSession = await sessions.getSessionbyHash(sessionId)
            let cookie: string | null = null
            let username: string | null = null  
            if (userSession !== null){
                cookie = userSession.sessionId
                username = userSession.UserName
            }

            res.status(200).json({cookie: cookie, username: username})
        }catch(err){
            console.log(err);
            res.status(500).json({cookie: "", username: ""})
        }

    }
}