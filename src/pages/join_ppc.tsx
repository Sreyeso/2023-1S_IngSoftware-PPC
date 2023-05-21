import styles from '../styles/Join.module.css';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { join } from 'path';

let inputFields = [ //Para poner los nombres por defecto de los campos,
    //y el nombre de la correspondiente propiedad en userToSend
    ["Usuario", "username","text"],
    ["Correo", "email","text"],
    ["Género","gender","select"],
    ["Región","country","select"], 
    ["Contraseña","password","password"],
    ["Repetir Contraseña","rep_password","password"]
];

let userToSend: object = {
    username:"",
    email:"",
    gender:"",
    country:"",
    password:"",
    rep_password:"",
}

type jsAnswer = {
    name:string
}

type msg_shower = {showMessageScreen: (js:jsAnswer)=>void}

const url = '/api/handleJoinRequest'

const joinButt = '/buttons/JOIN.png';

export default function Join (){
    return (
        <div>
            <Head>
                <title>Join PPC Games</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>          
                <div className = {styles.background}>
                    <div className = {styles.allInside}>
                        <div className = {styles.logo}>
                            <Image
                            src="/pages_imgs/logo_PPC.png"
                            alt="Logo de PPC Games"
                            width={200}
                            height={300}
                            />
                        </div>
                        <h2>Únete a PPC Games</h2>
                        <SubmitForm/>
                        <div className={styles.loginLink}>
                            <h3>
                                <Link href="/">¿Ya tienes una cuenta? Inicia sesión acá</Link>
                            </h3>
                        </div>        
                        <footer>
                            <h3>PPC - 2023</h3>
                            <h3>Copyright © PPC Team Ltd</h3>
                        </footer>
                    </div>    
                </div>
            </main>
        </div>
        
    );
}

function SubmitForm(){
    const [error, showError] = useState("Llena el formulario");
    const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
        showError(js.name)
    }

    async function getOptions(){
        const response = await fetch(url, {
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
                                    userToSend[field[1]] = e.target.value;                            
                                }}
                            >
                                <option value="" 
                                styles = "selected:invalid" 
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
                                userToSend[field[1]] = e.target.value;                            
                            }}>                 
                        </input>
                    );
                })}
            </div>
            <h3>{`¡${error}!`}</h3>
            <div className = {styles.buttonDiv}>
                <LoginButton showMessageScreen = {showMessageScreen}/>
            </div>            
        </form>
    )
}

function LoginButton({showMessageScreen}:msg_shower){
    //Cuando se presiona el botón, se envía al servidor lo
    //que haya en el objeto userToSend
    async function sendNewUser(){
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(userToSend),
        });
        const json = await response.json();
        showMessageScreen(json);
        console.log(userToSend)
    }
    return (
        <button 
            type="button"
            onClick={sendNewUser} 
            className={styles.button}
        >
            <img src = {joinButt}></img>    
        </button>
    );
}