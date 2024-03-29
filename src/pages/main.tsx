import styles from '../styles/Main.module.css';
import Head from 'next/head'
import { useRouter } from 'next/router'

type jsAnswer = {
    name: string;
}

const startButton = '/sprites/generalAssets/START GAME.png';
const profileButton = '/sprites/generalAssets/PROFILE.png';
const rankingButton = '/sprites/generalAssets/RANKINGS.png';
const aspectButton = '/sprites/generalAssets/ASPECT.png';
const gachaButton = '/sprites/generalAssets/GACHA.png';
const logoutButton = '/sprites/generalAssets/LOG-OUT.png';

export default function Main (){
    return (
        <div>
            <Head>
                <title>PPC Games</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div className = {styles.background}>
                    <div className= {styles.allInside}>
                        <div className = {styles.logoDiv}>
                            <img 
                                src="/backgrounds/logo_PPC.png"
                                className={styles.logo}>
                            </img> 
                        </div>
                        <h1 className= {styles.title}>BIENVENIDO A PPC GAMES</h1>
                        <Buttons/>
                    </div>    
                </div>
            </main>
        </div>
    );
}

function Buttons() {

    return (
        <div>
            <div className= {styles.buttonDiv1}> 
                <StartButton/>
                <ProfileButton/>
                <RankingButton/>
            </div>
            <div className= {styles.buttonDiv2}> 
                <AspectButton/>
                <GachaButton/>
                <LogOutButton/>
            </div>
        </div>
    );
}

function StartButton(){
    //Cuando se presiona el botón, se redirecciona al juego

    const router = useRouter()

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }   

    async function startGame(){
        showMessageScreen({name: "Iniciando Juego..."})
        router.push('/game')
    }

    return (
        <button 
            type="button"
            onClick={startGame} 
            className={styles.button}
        >
            <img src = {startButton}></img>    
        </button>
    );
}

function ProfileButton(){
    //Cuando se presiona el botón, se redirecciona al perfil del jugador

    const router = useRouter()

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openProfile(){
        showMessageScreen({name: "Entrando al perfil del jugador..."})
        router.push('/profile')
    }
    
    return (
        <button 
            type="button"
            onClick={openProfile} 
            className={styles.button}
        >
            <img src = {profileButton}></img>    
        </button>
    );
}

function RankingButton(){
    //Cuando se presiona el botón, se redirecciona a la tabla de ranking

    const router = useRouter()

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openRanking(){
        showMessageScreen({name: "Entrando a el Ranking..."})
        router.push('/rankings')
    }
    
    return (
        <button 
            type="button"
            onClick={openRanking} 
            className={styles.button}
        >
            <img src = {rankingButton}></img>    
        </button>
    );
}


function AspectButton(){
    //Cuando se presiona el botón, se redirecciona al menu de cambio de aspecto

    const router = useRouter()

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openAspect(){
        showMessageScreen({name: "Entrando a el menu de personalizacion..."})
        router.push('/customization')
    }
    
    return (
        <button 
            type="button"
            onClick={openAspect} 
            className={styles.button}
        >
            <img src = {aspectButton}></img>    
        </button>
    );
}

function GachaButton(){
    //Cuando se presiona el botón, se redirecciona al gacha

    const router = useRouter()
 
    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openGacha(){
        showMessageScreen({name: "Entrando al GACHA..."})
        router.push('/gacha')
    }
    
    return (
        <button 
            type="button"
            onClick={openGacha} 
            className={styles.button}
        >
            <img src = {gachaButton}></img>    
        </button>
    );
}

function LogOutButton(){
    //Cuando se presiona el botón, se cierra la sesión
    const router = useRouter()

    async function logout(){
        await fetch('/api/getSessions',{
            method: "DELETE",
        })
        router.push('/login')
    }
    
    return (
        <button 
            type="button"
            onClick={logout} 
            className={styles.button}
        >
            <img src = {logoutButton}></img>    
        </button>
    );
}