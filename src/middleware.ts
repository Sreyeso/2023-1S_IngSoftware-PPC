import { NextRequest, NextResponse } from 'next/server';
// import sessions from'@/authentication/sessions.json'
// import sessions from '@/authentication/sessions.json'
// import DBO from "@/lib/utils/dbo";
// import SessionModel from '@/lib/models/session'
import { Collection, Db, ObjectId,Document} from "mongodb";

/*
    El propósito de este middleware es verificar si el usuario está logueado
    Si el usuario está logueado, en su navegador debe haber una cookie.
    En este middleware se detecta si existe esa cookie, si el valor de dicha
    cookie efectivamente está contenido en sessions.json (Que es el archivo
    que guarda las sesiones existentes de los usuarios) y si hace falta o no
    redireccionar a una u otra página en consecuencia
*/

export async function middleware(req: NextRequest){
    // let dbo = new DBO().db;
    // let sessions = new SessionModel(dbo);

    let cookie = req.cookies.get('session')?.value

    let session: string | null
    if(cookie){
        try{
        const res = await fetch('localhost:3000/api/getSessions',{
            method: "GET",
            headers:{
                id: cookie
            }
        });
        const sessionJson = await res.json();
        session = sessionJson.name;
        }
        catch(error){
            console.log(error)
        }
    }else
        session = null

    if(!cookie)
        cookie = '' as string

        const protectedRoutes = ['/game','/profile']
        
        if (verifyPathname(protectedRoutes, req) && (cookie === '' || session === null)){
            const response = NextResponse.redirect(new URL('/login', req.url));
            response.cookies.delete('session');
            return response;
        }
        else if(verifyPathname(['/join_ppc','/login','/restore_password'],req) && cookie && session !== null){
            //El usuario está logueado, por lo que es necesario sacarlo de estas páginas
            const response = NextResponse.redirect(new URL('/game', req.url));
            return response;
        }

    //const sessionsJson = sessions as Record<string,string>
    //console.log(sessionsJson)

    // const protectedRoutes = ['/game','/profile']
    
    // if (verifyPathname(protectedRoutes, req) && (cookie === '' || session === undefined)){
    //     const response = NextResponse.redirect(new URL('/login', req.url));
    //     response.cookies.delete('session');
    //     return response;
    // }
    // else if(verifyPathname(['/join_ppc','/login','/restore_password'],req) && cookie && session !== undefined){
    //     //El usuario está logueado, por lo que es necesario sacarlo de estas páginas
    //     const response = NextResponse.redirect(new URL('/game', req.url));
    //     return response;
    // }

    return NextResponse.next()
}

function verifyPathname (listOfUrls: string[] = [], req: NextRequest){
    let isFrom: boolean = false;
    listOfUrls.forEach(element => {
        if (req.nextUrl.pathname.startsWith(element))
            isFrom = true;
    });
    return isFrom;
}

export const config = {
    matcher: ['/game','/profile','/restore_password','/join_ppc','/login']
}