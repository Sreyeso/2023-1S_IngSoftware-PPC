//Tipos que se usan varias veces en el proyecto

//En general

export type Data= { name:string }

//Para registro:

export interface User{
    username: string,
    email: string,
    gender: string,
    region: string,
    password: string,
}

export interface UserFromFrontend extends User{
    rep_password: string,
}

export type KeyUser = keyof User;
export type KeyUserFromFrontend = keyof UserFromFrontend;

//Para login:

export interface Credentials{
    userOrEmail: string,
    password: string
}

export type KeyCredentials = keyof Credentials;

// Para cambio de datos:

export type ChangeableData = {
    user: string,
    email: string,
    password: string
}

export type KeyOfChangeableData = keyof ChangeableData


