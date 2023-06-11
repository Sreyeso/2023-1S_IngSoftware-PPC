import Link from 'next/link';
import styles from '@/styles/Login.module.css'
import Head from 'next/head'
import { Credentials, KeyCredentials } from '@/lib/variousTypes'

let creds: Credentials = {userOrEmail: "", password: ""};

export default function login2(){
    
    const loginButt = '/buttons/LOG-IN.png';

    const sendCreds = async () => {
        const res = await fetch('/api/handleLogin',{
            method: "POST",
            body: JSON.stringify(creds)
        })
        let resText = await res.json();
        console.log(resText)
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
                        <img src = "/backgrounds/logo_PPC.png"> 
                        </img>
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
                        <div className={styles.buttonDiv}>
                            <button
                            onClick={e =>{
                                e.preventDefault();
                                sendCreds();
                            }}>
                                <img src = {loginButt}>
                                </img>
                            </button>
                        </div>
                        <h3 className={styles.link}>
                            <Link href="/join_ppc">¿Aún no tienes una cuenta? Crea una</Link>
                        </h3>
                        <h3 className = {styles.link}>
                            <Link href="/restore_password">¿Has olvidado tu contraseña?</Link>
                        </h3>
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