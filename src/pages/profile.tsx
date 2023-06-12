import Head from "next/head";
import styles from '@/styles/Profile.module.css'
import cookie from 'js-cookie'

export default function Profile(/*{token}*/){
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
                    {/* <h2>{token}</h2> */}
                    <button 
                    className = {styles.logoutButton}
                    onClick={e => {
                        // e.preventDefault();
                        // cookie.remove("token");
                    }}>
                        <img src='/buttons/LOG-OUT.png'></img>
                    </button>
                </div>
            </main>
        </>
    )
}

// export function getServerSideProps({ req, res }){
//     return { props: {token: req.cookies.token}}
// }