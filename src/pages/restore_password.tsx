import Link from 'next/link';
import styles from '@/styles/RestorePassword.module.css'
import { useState } from 'react'

export default function RestorePassword() {
    let email: string;

    const [ans, setAnsScreen] = useState ([]);
    
    async function sendMail(){
        console.log(typeof(ans));
        setAnsScreen(["Procesando solicitud"]);
        const response = await fetch('api/handlePasswordRestoration',{
            method: "PUT",
            body: email
        })
        try{
            const res = await response.json();
            const msgTxt: string = await res.name;
            setAnsScreen([msgTxt]);
        } catch(e){
            console.log(e)
        }   
    }

    return (
        <div className = {styles.Background}>
            <div className = {styles.AllInside}>
                <div className = {styles.centeredContent}>
                    <h1>¿Has olvidado tu contraseña?</h1>
                    <h2>Restaurala:</h2>
                    <form className={styles.form}>
                        <input
                        type="email"
                        placeholder='Correo'
                        onChange={e => {
                            e.preventDefault();
                            email = e.target.value;
                        }}
                        />
                        {ans.map((answ,i) => <h2 key={i} className={styles.response}>{answ}</h2>)}
                        <button onClick ={e => {
                            e.preventDefault();
                            sendMail();
                        }} 
                        >
                            Enviar Correo
                        </button>  
                    </form>
                    <h3 className = {styles.link}>
                        <Link href="/login2">Volver al login</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
}