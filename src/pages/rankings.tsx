import React, { Component } from "react";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import Clients from "@/lib/models/user";


  export async function getServerSideProps(ctx: { req: any; }) {
    let DB: DBO | null = null; // Initialize DB variable with null
    
    let isConnected = false;
    let userCoins = 0;
    let userGems = 0;
    let userSkin = 0;
    let maxScore = 0;
    let region = "Base";
    let ranks = [];
    try {
      // Database object
      DB = new DBO();
      // User data object
      const UDO = new UserModel(DB.db);
      const {req} = ctx;
      const userName:string= req.headers.user;
      let userData = await UDO.getUser(userName);
      let ranksUsers = await UDO.getTop();
  
      if (userData) {
        userCoins = userData.CoinAmount;
        userGems = userData.GemAmount;
        userSkin = userData.CurrentAspect[0];
        maxScore = userData.HiScore;
        isConnected = true;
        region = userData.Region;
      } else {
        console.log("ERROR FETCHING USER DATA");
      }
      
      if (ranksUsers){
        ranks[0] = ranksUsers[0];
        ranks[1] = ranksUsers[1];
        ranks[2] = ranksUsers[2];
        ranks[3] = ranksUsers[3];
        ranks[4] = ranksUsers[4];
        ranks[5] = ranksUsers[5];
        ranks[6] = ranksUsers[6];
        ranks[7] = ranksUsers[7];
        ranks[8] = ranksUsers[8];
        ranks[9] = ranksUsers[9];
      }
      return {
        props: { ranks,},
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
  

//tuto tomado de: https://www.youtube.com/watch?v=p_046Qe19p0

export default class Leaderboard extends Component<Clients>{
    render() {
    return(
    <div>
    <div className="board">
            <h1 className="leaderboard">Rankings</h1>
            <Profiles datos={[this.props.ranks[0],this.props.ranks[1],this.props.ranks[2],this.props.ranks[3],this.props.ranks[4],this.props.ranks[5],this.props.ranks[6],this.props.ranks[7],this.props.ranks[8],this.props.ranks[9]]}></Profiles>
    </div>
    <div>
    <button><img src="/sprites/generalAssets/LOG-OUT.png" alt="Logout"/></button>
    <button><img src="/sprites/generalAssets/PROFILE.png" alt="Perfil"/></button>
    <a href="\leaderboard"><button><img src="./sprites/generalAssets/RANKINGS.png" alt="Rankings"/></button></a>
    <a href="\stats"><button><img src="/sprites/generalAssets/GACHA.png" alt="Gacha"/></button></a>
    </div>
    </div>);
    }
}



export function Profiles({datos}:any){
    return(
        <div id="profile">
            {Item(datos[0],"01")}
            {Item(datos[1],"02")}
            {Item(datos[2],"03")}
            {Item(datos[3],"04")}
            {Item(datos[4],"05")}
            {Item(datos[5],"06")}
            {Item(datos[6],"07")}
            {Item(datos[7],"08")}
            {Item(datos[8],"09")}
            {Item(datos[8],"10")}
        </div>
    )
}

function Item(datos:any,number:any){
    let imagen = `/sprites/allSkins/${datos.CurrentAspect[0]}`
    let gorro = `/sprites/allHats/${datos.CurrentAspect[1]}`
    return (
        <div className="flex">
            <div className="item">
                <h1>{number}</h1>
                <div className="fulluser">
                <img src={gorro} alt="userGorro"></img>
                <img src={imagen} alt="userSkin"></img>
                </div>
                <div className="info">
                    <h3 className="name text">{datos.UserName}</h3>
                    <span>Región: {datos.Region}</span>
                </div>
            </div>
            <div className="item">
                <span>Score: {datos.HiScore}</span>
            </div>
        </div>
    )
    
}