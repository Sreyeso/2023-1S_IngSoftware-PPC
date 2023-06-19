import { NextRequest, NextResponse } from 'next/server';

/*
    El propósito de este middleware es verificar si el usuario está logueado
    Si el usuario está logueado, en su navegador debe haber una cookie, y en la 
    bd debe existir dicha cookie.
    En este middleware se detecta si existe esa cookie, si el valor de dicha
    cookie efectivamente está contenido en la bd (Que es el archivo
    que guarda las sesiones existentes de los usuarios) y si hace falta o no
    redireccionar a una u otra página en consecuencia
*/

export async function middleware(req: NextRequest){

    let cookie = req.cookies.get('session')?.value

    let user: string | null
    if(cookie){
        try{
        const res = await fetch(req.nextUrl.origin + '/api/getSessions',{
            method: "GET",
            headers:{
                id: cookie
            }
        });
        const sessionJson = await res.json();
        if (res.status === 500)
            user = null
        else
            user = sessionJson.username;

        }
        catch(error){
            console.error(`error ${error}`)
            const response = NextResponse.redirect(new URL('/login', req.url));
            response.cookies.delete('session')
            return NextResponse.next()
        }
    }else
        user = null

    if(!cookie)
        cookie = '' as string

    const protectedRoutes = ['/game','/profile']
        
    if (verifyPathname(protectedRoutes, req) && (cookie === '' || user === null)){
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('session');
        return response;
    }
    else if(verifyPathname(['/join_ppc','/login','/restore_password'],req) && cookie && user !== null){
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