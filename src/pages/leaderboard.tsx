import Board from "@/components/board";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import dynamic from 'next/dynamic';
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

//tuto tomado de: https://www.youtube.com/watch?v=p_046Qe19p0

export default class Leaderboard extends Component{
    render() {
    return(
    <div>
    <Board></Board>
    <button><img src="./sprites/generalAssets/LOG-OUT.png" alt="Logout"/></button>
    <button><img src="./sprites/generalAssets/PROFILE.png" alt="Perfil"/></button>
    <a href="\leaderboard"><button><img src="./sprites/generalAssets/RANKINGS.png" alt="Rankings"/></button></a>
    <button><img src="./sprites/generalAssets/GACHA.png" alt="Gacha"/></button>
    </div>);
    }
}
