import { NextRequest, NextResponse } from 'next/server';
import sessions from'@/authentication/sessions.json'

export function middleware(req: NextRequest){
    console.log("request: ", req.nextUrl.pathname);

    const cookie = req.cookies.get('session')?.value

    const sessionsJson = sessions as Record<string,string>

    const protectedRoutes = ['/sketch','/profile']
    
    if (verifyPathname(protectedRoutes, req)){
        if(!cookie || !sessionsJson[cookie]){
            const response = NextResponse.redirect(new URL('/login', req.url));
            response.cookies.delete('session');
            return response;
        }
    }
    else if(verifyPathname(['/join_ppc','/login'],req) && cookie && sessionsJson[cookie]){
        const response = NextResponse.redirect(new URL('/sketch', req.url));
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
    matcher: ['/sketch','/profile','/restore_password','/join_ppc','/login']
}