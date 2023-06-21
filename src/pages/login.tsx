import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Login.module.css'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Data, Credentials, KeyCredentials } from '@/authentication/variousTypes'

let creds: Credentials = {userOrEmail: "", password: ""};

export default function Login(){
    
    const emptyArray: string[] = []
    const [message, displayMessage] = useState(emptyArray);

    const router = useRouter();

    const sendCreds = async () => {
        displayMessage(emptyArray); 
        
        const res = await fetch('/api/handleLogin',{
            method: "POST",
            body: JSON.stringify(creds)
        })
        let resText: Data = await res.json();
        displayMessage([resText.name]);
    
        if(res.status === 200){
            router.push('/main'); //Redirección al juego
        }
    }

    return(
        <>
            <Head>
                <title>Login PPC Games</title>
                <meta name="description" content="Login PPC Games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                
                <div className={styles.videoDiv}>
                        <video autoPlay loop muted>
                            <source src="backgrounds/gameplay3.mp4" type="video/mp4"></source>
                        </video>
                </div>
                <div className = {styles.allInside}>
                    <div className = {styles.logoPPC}>
                        <Image src = "/backgrounds/logo_PPC.png"alt="lol,lmao" height="100" width="100"> 
                        </Image>
                    </div>
                    <form className = {styles.loginForm}>
                        <div className = {styles.textDiv}>
                            <h2 className={styles.bigText}>¡Qué empiece la diversión!</h2>
                            <h2 className={styles.smallText}>Inicia sesión</h2>
                        </div>
                        <InputField 
                            typeField="text" 
                            placeholder="Usuario o correo"
                            exportFields="userOrEmail"
                        />
                        <InputField 
                            typeField="password" 
                            placeholder="Contraseña"
                            exportFields="password"
                        />
                        {message.map((message, index) => {
                            return <h2 className={styles.messageFromBack} key={index}>{message}</h2>
                        })}
                        <div className={styles.buttonDiv}>
                            <button
                            onClick={e =>{
                                e.preventDefault();
                                sendCreds();
                            }}>
                                <img src = '/sprites/generalAssets/LOG-IN.png'></img>
                            </button>
                        </div>
                        <div className={styles.linksTest}>
                            <h3 className={styles.link}>
                                <Link href="/join_ppc">¿Aún no tienes una cuenta? Crea una</Link>
                            </h3>
                            <h3 className = {styles.link}>
                                <Link href="/restore_password">¿Has olvidado tu contraseña?</Link>
                            </h3>
                        </div>
                    </form>
                </div>    
            </main>
        </>            
    )
}

function InputField(props: { typeField: string; placeholder: string; exportFields: string; }){
    const { typeField, placeholder, exportFields } = props;
    return(
        <div className={styles.inputDiv}>
            <input 
                type={typeField}
                required
                placeholder=" "
                onChange = {e => {
                    e.preventDefault();
                    creds[exportFields as KeyCredentials] = e.target.value;
                }}            
            />
            <span>{placeholder}</span>
        </div>
    );
}