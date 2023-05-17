import styles from '../styles/Join.module.css';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from 'react'

let inputFields = [ //Para poner los nombres por defecto de los campos,
    //y el nombre de la correspondiente propiedad en user_to_send
    ["Usuario", "username","text"],
    ["Correo", "email","text"],
    ["Género","gender","select"],
    ["Región","country","select"], 
    ["Contraseña","password","password"],
    ["Repetir Contraseña","rep_password","password"]
];

let user_to_send:object = {
    username:"",
    email:"",
    gender:"",
    country:"",
    password:"",
    rep_password:"",
}

type js_answer = {
    name:string
}

type msg_shower = {showMessageScreen: (js:js_answer)=>void}

const url = '/api/handleJoinRequest'

const join_butt = '/buttons/JOIN.png';

export default function Join (){
    return (
        <div>
            <Head>
                <title>Join PPC Games</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>          
                <div className = {styles.Background}>
                    <div className = {styles.AllInside}>
                        <div className = {styles.logo}>
                            <Image
                            src="/pages_imgs/logo_PPC.png"
                            alt="Logo de PPC Games"
                            width={200}
                            height={300}
                            priority                    
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

function SubmitForm(props: object){
    const [error, showError] = useState("Llena el formulario");
    const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);

    function showMessageScreen (js: js_answer) {
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
        <form className={styles.SubmitForm}>
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
                                key={index} onChange={(e) => {
                                    e.preventDefault();
                                    user_to_send[field[1]] = e.target.value;                            
                                }}
                            >
                                <option value="" disabled selected>{field[0]}</option>
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
                                user_to_send[field[1]] = e.target.value;                            
                            }}>                                                                                        
                        </input>
                    );
                })}
            </div>
            <h3>{`¡${error}!`}</h3>
            <div className = {styles.LoginButton}>
                <PPCButtons showMessageScreen = {showMessageScreen}/>
            </div>            
        </form>
    )
}

function PPCButtons({showMessageScreen}:msg_shower){
    async function sendNewUser(){
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(user_to_send),
        });
        const json = await response.json();
        showMessageScreen(json);
        console.log(user_to_send)
    }
    return (
        <button type="button"
         onClick={sendNewUser} 
         className={styles.Buttons}>    
        </button>
    );
}