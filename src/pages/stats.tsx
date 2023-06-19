import React, { Component } from "react";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import Clients from "@/lib/models/user";

export async function getServerSideProps() {
  let DB: DBO | null = null; // Initialize DB variable with null
  
  let isConnected = false;
  let userCoins = 0;
  let userGems = 0;
  let userSkin = 0;
  let maxScore = 0;

  try {
    // Database object
    DB = new DBO();
    // User data object
    const UDO = new UserModel(DB.db);
    let userData = await UDO.getUser("bingustest");
    let AllCoins = await UDO.getAllCoins()
    if (userData) {
      userCoins = userData.CoinAmount;
      userGems = userData.GemAmount;
      userSkin = userData.CurrentAspect;
      maxScore = userData.HiScore;
      isConnected = true;
    } else {
      console.log("ERROR FETCHING USER DATA");
    }

    return {
      props: { isConnected, userCoins, userGems, userSkin, maxScore, AllCoins },
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
            <th>{this.props.AllCoins}</th>
        </tr>
        <tr>
            <td>Anom</td>
        </tr>
        <tr>
            <td>Megha</td>
        </tr>
        <tr>
            <td>Subham</td>
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