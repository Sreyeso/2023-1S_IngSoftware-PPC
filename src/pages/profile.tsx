import Head from "next/head";
import Link from "next/link"
import styles from '@/styles/Profile.module.css'
import generalStyles from '@/styles/GeneralStyles.module.css'
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import StatsModel from "@/lib/models/stats";
import { useRouter } from 'next/router'
import { ChangeableData, KeyOfChangeableData} from '@/authentication/variousTypes'
import PPCButton from "@/components/PPCButton";

interface UserProps {
    userName: string,
    region: string,
    gender: string,
    mail: string
    userSkin: string;
}

let changes: ChangeableData = {
    user: "",
    email: "",
    password: "",
}


export default function Profile(props: UserProps){

    const {userName, region, gender, mail, userSkin } = props;


    console.log(userSkin)
    const router = useRouter();

    async function logout(){
        await fetch('/api/getSessions',{
            method: "DELETE",
        })
        router.push('/login')
    }

    //Still not working!

    async function deleteAccount(){
        const response = await fetch('/api/handleLogin',{
            method: "DELETE",
            body: userName,
        });

        console.log(response)
        const resJson = await response.json();
        alert(resJson)
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
                            <h2 className = {styles.welcome}>{`Hola ${userName}`}</h2>
                            <div className={styles.mainFunctionality}>

                                <form className={styles.personalInformation}>                                                                        
                                    <h2 className={styles.nonEditable}>Región: {region}</h2>
                                    <h2 className={styles.nonEditable}>Género: {gender}</h2>
                                    <ChangeableInfo label="Usuario" currentValue = {userName} jsonField="user"></ChangeableInfo>                                    
                                    <ChangeableInfo label="Email" currentValue = {mail} jsonField="email"></ChangeableInfo>                                    
                                    <ChangeableInfo label="Contraseña" currentValue = {"Cambia tu contraseña"} jsonField="password"></ChangeableInfo>                                    
                                    <button onClick={()=>{}}>
                                        Enviar Datos
                                    </button>
                                </form>

                                <div className={styles.rightPanel}>
                                    <div className={styles.skin}>
                                        <img src={`/sprites/allHats/${userSkin[1]}`} alt="userGorro" />                                    
                                        <img src={`/sprites/allSkins/${userSkin[0]}`} alt="userSkin" />
                                    </div>  
                                    <div className={styles.buttonsPanel}>                                  
                                        <div className= {styles.buttonsContainer}>
                                            <PPCButton func={logout} image="sprites/generalAssets/LOG-OUT.png" st={{width:'60%'}}></PPCButton>
                                        </div>
                                        <div className = {styles.buttonsContainer}>
                                            <PPCButton func={() => {router.push("/rankings")}} image="sprites/generalAssets/RANKINGS.png" st={{width:'60%'}}> </PPCButton>                                                                        
                                        </div>
                                        <div className = {styles.deleteAccount}>
                                            <button onClick={deleteAccount}>
                                                Eliminar Cuenta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                            <Link 
                            className={generalStyles.link}
                            style={{fontSize:'120%', marginTop:'2%'}}
                            href="/main">
                                Volver al Menú Principal
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

function ChangeableInfo(props:any){
    const { label, currentValue, jsonField } = props;

    return (
        <div className={styles.inputLabelDiv}>
            <h2 className={styles.label}>{label}</h2>
            <input 
            type="text" 
            placeholder={currentValue}
            onChange={e => {
                e.preventDefault()
                changes[jsonField as KeyOfChangeableData] = e.target.value;
                console.log(changes)
            }}>
            </input>
        </div>
    )
}

export async function getServerSideProps(ctx: { req: any; }){

    let DB: DBO | null = null; // Initialize DB variable with null

    let isConnected = false;
    let userCoins = 0;
    let userGems = 0;
    let userSkin = 0;
    let maxScore = 0;
    let region: string  = ''
    let gender: string =''
    let mail: string = ''

    try {
      // Database object
      DB = new DBO();
      // User data object
      const UDO = new UserModel(DB.db);
      // Get logged user
      const {req} = ctx;
      const userName:string= req.headers.user;
      let userData = await UDO.getUser(userName);

     console.log(userData)

      if (userData) {
        userCoins = userData.CoinAmount;
        userGems = userData.GemAmount;
        userSkin = userData.CurrentAspect;
        maxScore = userData.HiScore;
        region = userData.Region;
        gender = userData.Gender;
        mail = userData.Mail;
        isConnected = true;
      } else {
        console.log("ERROR FETCHING USER DATA");
      }

      return {
        props: { isConnected, userCoins, userGems, userSkin, maxScore, userName, region, gender, mail },
      };
    } catch (e) {
      console.error(e);
      return {
        props: { isConnected },
      };
    } finally {
      if (DB) {
        DB.end();
      }
    }

}
