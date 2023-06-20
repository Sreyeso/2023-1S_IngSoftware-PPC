import Head from "next/head";
import styles from '@/styles/Profile.module.css'
<<<<<<< HEAD
import { GetServerSideProps } from "next";
=======
import {GetServerSideProps } from "next";
import Image from 'next/image';
>>>>>>> DesarrolloSantiagoR

interface UserProps {user: string}

<<<<<<< HEAD
export default function Profile(props: UserProps){
=======
export function getServerSideProps(ctx: { req: any; }){
    const {req} = ctx;
    const username = req.headers.user
    return {
        props: {
            user: username
        }

    }
}

export default function Profile(props: props){
>>>>>>> DesarrolloSantiagoR

    const {user} = props;

    return(
        <>
            <Head>
                <title>Your PPC profile</title>
                <meta name="description" content="Login PPC Games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div>
                    <h1 className = {styles.provisional}>Profile information doing</h1>
                    <h2>{user}</h2>
                    <button 
                    className = {styles.logoutButton}
                    onClick={e => {}}>
                        <Image src='/buttons/LOG-OUT.png'alt="lol,lmao"></Image>
                    </button>
                </div>
            </main>
        </>
    )
}

<<<<<<< HEAD
export const getServerSideProps: GetServerSideProps<UserProps> = async (ctx) => {
    const {req} = ctx;
    const user = req.headers.user as string
    
    return {
        props:{
            user
        }
    }
}
=======
>>>>>>> DesarrolloSantiagoR
