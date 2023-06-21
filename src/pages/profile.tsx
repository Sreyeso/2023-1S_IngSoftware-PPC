import Head from "next/head";
import styles from '@/styles/Profile.module.css'
import stylesButtons from '@/styles/PPCButton.module.css'
import { useRouter } from 'next/router'

interface UserProps {user: string}

export default function Profile(props: UserProps){

    const {user} = props;
    const router = useRouter();

    async function logout(){
        await fetch('/api/handleLogin',{
            method: "DELETE",
        })
        router.push('/login')
    }

    return(
        <>
            <Head>
                <title>Your PPC profile</title>
                <meta name="description" content="Login PPC Games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div className = {styles.background}>
                    <div className = {styles.allInside}>
                        <div className = {styles.content}>
                            <h2 className = {styles.welcome}>{`Hola ${user}`}</h2>
                            <div className = {styles.buttonsContainer}>
                                <button 
                                className={stylesButtons.PPCButton} 
                                style={{width:'40%'}}
                                onClick = {logout}>
                                    <img src="/assets/LOG-OUT.png"></img>
                                </button>
                            </div>    
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

function logOut(){
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
    };

}

export function getServerSideProps(ctx: { req: any; }){

    const {req} = ctx;
    const username = req.headers.user
    return {
        props: {
            user: username
        }

    }
}
