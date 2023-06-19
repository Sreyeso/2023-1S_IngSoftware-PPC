import Head from "next/head";
import styles from '@/styles/Profile.module.css'
import {GetServerSideProps } from "next";

type props = {user: string}

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
                        <img src='/buttons/LOG-OUT.png'></img>
                    </button>
                </div>
            </main>
        </>
    )
}

