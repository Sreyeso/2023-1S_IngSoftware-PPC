import styles from '@/styles/Join.module.css';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UserFromFrontend, KeyUserFromFrontend } from '@/lib/variousTypes'

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

    const API_NAME = '/api/handleJoinRequest';

    //La función que se ejecuta cuando se presiona del botón JOIN
    async function sendNewUser(){
        displayMessage("Procesando datos");

        const response = await fetch(API_NAME, {
            method: "PUT",
            body: JSON.stringify(userToSend),
        });

        const json = await response.json();
        displayMessage(json.name);
    }

    //Obtener las regiones y los géneros desde el backend
    async function getOptions(){
        const response = await fetch(API_NAME, {
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
                    
                    const DISPLAY_TEXT = field[0];
                    const JSON_FIELD = field[1];
                    const INPUT_TYPE = field[2];

                    if(INPUT_TYPE==="select")
                    {
                        let optionsToDisplay: string[] = [];
                        if(JSON_FIELD==="gender")
                            optionsToDisplay = optionsToDisplay.concat(genders);     
                        else
                            optionsToDisplay = optionsToDisplay.concat(countries);                                                
                        return <DropdownMenu selectInfo={field} key={index} index={index} options={optionsToDisplay}/>
                    }
                    else
                    {
                        return (                            
                            <input             
                                type={INPUT_TYPE}
                                placeholder={DISPLAY_TEXT}
                                key={index}
                                onChange={e => {
                                    e.preventDefault();
                                    userToSend[JSON_FIELD as KeyUserFromFrontend] = e.target.value;                            
                                }}>                 
                            </input>
                        );
                    }
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

//El siguiente componente corresponde a los dos dropdown menus de la sección
function DropdownMenu (props: {selectInfo: string[], index: number, options: string[]}){
    const { selectInfo, index, options } = props;

    const DISPLAY_TEXT = selectInfo[0];
    const JSON_FIELD = selectInfo[1];

    return(
        <>
            <select
            name = {DISPLAY_TEXT}
            className = {styles.selection}
            key = {index}
            onChange = {e => {
                e.preventDefault();
                userToSend[JSON_FIELD as KeyUserFromFrontend] = e.target.value;
            }}
            >
                <option 
                    value = "" selected disabled hidden
                    key = {0}
                >
                    {DISPLAY_TEXT}
                </option>
                {options.map(function(option, indexOptions){
                    return (
                        <option 
                            value={option} 
                            key={indexOptions+1}
                        >
                            {option}
                        </option>
                    );
                })}
            </select>
        </>
    )
}