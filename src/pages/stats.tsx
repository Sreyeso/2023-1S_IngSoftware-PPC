import React, { Component } from "react";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import StatsModel from "@/lib/models/stats";
import Clients from "@/lib/models/user";
import '@/styles/stats.css'

export async function getServerSideProps(ctx: { req: any; }) {
  let DB: DBO | null = null; // Initialize DB variable with null
  
  let isConnected = false;
  let userCoins = 0;
  let userGems = 0;
  let userSkin = 0;
  let maxScore = 0;
  let AllCoins = 0;
  let AllGems = 0;
  let skinCount = 0;
  let hatCount = 0;

  try {
    // Database object
    DB = new DBO();
    // User data object
    const UDO = new UserModel(DB.db);

    //Stats data object
    const SDO = new StatsModel(DB.db);
    // Get logged user
    const {req} = ctx;
    const userName:string= req.headers.user;
    let userData = await UDO.getUser(userName);
    let objectsCount = await UDO.getSkinsPercent(userName);
    let objectshCount = await UDO.getHatsPercent(userName);

    let objectCoins = await SDO.getAllCoins();
    let objectGems = await SDO.getAllGems();
    
    if (userData) {
      userCoins = userData.CoinAmount;
      userGems = userData.GemAmount;
      userSkin = userData.CurrentAspect;
      maxScore = userData.HiScore;
      isConnected = true;
    } else {
      console.log("ERROR FETCHING USER DATA");
    }

    if (objectCoins){
      AllCoins = objectCoins[0].TotalCoins;
    }

    if (objectGems){
      AllGems = objectGems[0].TotalGems;
    }

    if (objectsCount){
      skinCount = objectsCount[0].innerArrayLength;
    }

    if (objectshCount){
      hatCount = objectshCount[0].innerArrayLength;
    }

    return {
      props: { isConnected, userName, userCoins, userGems, userSkin, maxScore, AllCoins , AllGems , skinCount, hatCount},
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


  export default class Statistics extends Component<Clients>{
    render() {
    return(
    <div>
    <div className="stats">
    <table>
        <tbody>
        <tr>
            <th>Estadísticas</th>
        </tr>
        <tr>
            <td>Monedas obtenidas por todos los jugadores: {this.props.AllCoins}</td>
        </tr>
        <tr>
            <td>Gemas obtenidas por todos los jugadores: {this.props.AllGems}</td>
        </tr>
        <tr>
            <td>Puntuación máxima personal: {this.props.maxScore}</td>
        </tr>
        <tr>
            <td>Cantidad de skins deesbloqueadas: {this.props.skinCount}</td>
        </tr>
        <tr>
            <td>Cantidad de gorros deesbloqueados: {this.props.hatCount}</td>
        </tr>
        </tbody>
    </table>
    </div>
      <div className="flex">
          <button><img src="./sprites/generalAssets/LOG-OUT.png" alt="Iniciar Juego"/></button>
          <button><img src="./sprites/generalAssets/PROFILE.png" alt="Perfil"/></button>
          <a href="\webleader"><button><img src="./sprites/generalAssets/RANKINGS.png" alt="Rankings"/></button></a>
          <button><img src="./sprites/generalAssets/GACHA.png" alt="Gacha"/></button>
      </div>
    </div>
    );
    }
}