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

function Board(){
    return(
        <div className="board">
            <h1 className="leaderboard">Rankings</h1>
            <Profiles datos={this.props.userName}></Profiles>
        </div>
    );
}

export function Profiles({datos}){
    return(
        <div id="profile">
            {Item(datos)}
        </div>
    )
}

function Item(datos){
    return (
        <div className="flex">
            <div className="item">
                <img src="./sprites/pro.gif" alt="test"></img>
                <div className="info">
                    <h3 className="name text-dark">{datos}</h3>
                    <span>Región: </span>
                </div>
            </div>
            <div className="item">
                <span>Score</span>
            </div>
        </div>
    )
}