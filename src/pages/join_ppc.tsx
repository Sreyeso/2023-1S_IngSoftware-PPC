import styles from '@/styles/Join.module.css';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import { Data, UserFromFrontend, KeyUserFromFrontend } from '@/lib/variousTypes'

let inputFields = [ //Para poner los nombres por defecto de los campos,
    //y el nombre de la correspondiente propiedad en userToSend
    ["Usuario", "username","text"],
    ["Correo", "email","text"],
    ["Género","gender","select"],
    ["Región","region","select"], 
    ["Contraseña","password","password"],
    ["Repetir Contraseña","rep_password","password"]
];

let userToSend: UserFromFrontend = {
    username:"",
    email:"",
    gender:"",
    region:"",
    password:"",
    rep_password:"",
}

type msg_shower = {showMessageScreen: (js:Data, statusReceived: number)=>void}

export default function Join (){
    return (
        <div>
            <Head>
                <title>Join PPC Games</title>
                <meta name="description" content="Join the PPC Games Community" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main> 
                <div className={styles.videoDiv}>
                    <video autoPlay loop muted>
                        <source src="backgrounds/gameplay3.mp4" type="video/mp4"></source>
                    </video>
                </div>    
                <div className = {styles.allInside}>
                    <div className = {styles.logoDiv}>
                        <img 
                        src="/backgrounds/logo_PPC.png"
                        className={styles.logo}>
                        </img> 
                    </div>
                    <h2>Únete a PPC Games</h2>
                    <SubmitForm/>
                    <div className={styles.loginLink}>
                        <h3>
                            <Link href="/login2">¿Ya tienes una cuenta? Inicia sesión acá</Link>
                        </h3>
                    </div>        
                    <footer className={styles.footer}>
                        <h3>PPC - 2023</h3>
                        <h3>Copyright © PPC Team</h3>
                    </footer>
                </div>                        
            </main>
        </div>
        
    );
}

function SubmitForm(){
    const [error, displayMessage] = useState("Llena el formulario"); //El mensaje al usuario
    const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);

    //La función que se ejecuta cuando se presiona del botón JOIN
    async function sendNewUser(){
        displayMessage("Procesando datos");

        const response = await fetch('/api/handleJoinRequest', {
            method: "PUT",
            body: JSON.stringify(userToSend),
        });

        const json = await response.json();
        displayMessage(json.name);
    }

    //Obtener las regiones y los géneros desde el backend
    async function getOptions(){
        const response = await fetch('/api/handleJoinRequest', {
            method: "GET",
        });
        let responses = await response.json();
        setCountries(responses[0]);
        setGenders(responses[1]);
    }

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <form className={styles.submitForm}>
            <div className={styles.gridInputs}>
                {inputFields.map((field, index)=>{
                    let optionsToDisplay: string[] = [];
                    if(field[2]==="select"){
                        if(field[1]==="gender"){
                            optionsToDisplay = optionsToDisplay.concat(genders);
                        }
                        else{
                            optionsToDisplay = optionsToDisplay.concat(countries);                        
                        }
                        return(
                            <select 
                                name={field[0]} 
                                className = {styles.selection}
                                key={index} onChange={(e) => {
                                    e.preventDefault();
                                    userToSend[field[1] as KeyUserFromFrontend] = e.target.value;                            
                                }}
                            >
                                <option value="" 
                                selected disabled hidden>
                                    {field[0]}</option>
                                {optionsToDisplay.map(function(option, index2){
                                    return (<option value={option} key={index2+1}>{option}</option>);
                                })}
                            </select>
                        );
                    }
                    return (                            
                        <input             
                            key={index}
                            type={field[2]}
                            placeholder={field[0]}
                            onChange={(e)=>{
                                e.preventDefault();
                                userToSend[field[1] as KeyUserFromFrontend] = e.target.value;                            
                            }}>                 
                        </input>
                    );
                })}
            </div>
            <h3>{`¡${error}!`}</h3>
            <div className = {styles.buttonDiv}>
                <button
                type="button"
                onClick={sendNewUser}
                className={styles.button}
                >
                    <img src = '/buttons/JOIN.png'></img>
                </button>
            </div>            
        </form>
    )
}