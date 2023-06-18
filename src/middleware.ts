import { NextRequest, NextResponse } from 'next/server';
// import sessions from'@/authentication/sessions.json'
import sessions from '@/authentication/sessions.json'

/*
    El propósito de este middleware es verificar si el usuario está logueado
    Si el usuario está logueado, en su navegador debe haber una cookie.
    En este middleware se detecta si existe esa cookie, si el valor de dicha
    cookie efectivamente está contenido en sessions.json (Que es el archivo
    que guarda las sesiones existentes de los usuarios) y si hace falta o no
    redireccionar a una u otra página en consecuencia
*/

export function middleware(req: NextRequest){

    const cookie = req.cookies.get('session')?.value

    const sessionsJson = sessions as Record<string,string>
    console.log(sessionsJson)

    const protectedRoutes = ['/game','/profile']
    
    if (verifyPathname(protectedRoutes, req) && (!cookie || !sessionsJson[cookie])){
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('session');
        return response;
    }
    else if(verifyPathname(['/join_ppc','/login','/restore_password'],req) && cookie && sessionsJson[cookie]){
        //El usuario está logueado, por lo que es necesario sacarlo de estas páginas
        const response = NextResponse.redirect(new URL('/game', req.url));
        return response;
    }

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