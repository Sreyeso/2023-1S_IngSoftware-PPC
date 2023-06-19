import React, { Component } from "react";
import DBO from "@/lib/dbo";
import UserModel from "@/lib/models/user";

export async function getServerSideProps() {
    try {
      //Database object
      const DB:DBO=new DBO();
      //User data object
      const UDO=new UserModel(DB.db);
      let userData=await UDO.getUser("bingustest");
      //let userSkin=await 
      //retorno Objid, id in array, name ...
      return {
        props: { isConnected: true, userName:userData.UserName , region:userData.Region ,userSkin:userData.CurrentAspect,maxScore:userData.HiScore},
      }
    } catch (e) {
      console.error(e)
      return {
        props: { isConnected: false },
      }
    }
  }

  export default class Leaderboard extends Component{
    render() {
    return(
    <div>
    <div className="stats">
    <table>
        <tr>
            <th>Stats</th>
        </tr>
        <tr>
            <td>Anom</td>
            <td>19</td>
            <td>Male</td>
        </tr>
        <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
        </tr>
        <tr>
            <td>Subham</td>
            <td>25</td>
            <td>Male</td>
        </tr>
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