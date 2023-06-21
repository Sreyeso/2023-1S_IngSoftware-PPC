import React, { Component } from "react";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import StatsModel from "@/lib/models/stats";
import Clients from "@/lib/models/user";
import styles from '../styles/stats.module.css';
import PPCButton from "@/components/PPCButton";
import { withRouter, NextRouter } from 'next/router';

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

interface StatisticsProps{
  router: NextRouter;
  AllCoins:number;
  AllGems:number;
  maxScore:number;
  skinCount:number;
  hatCount:number;
}

class Statistics extends Component<StatisticsProps>{
  render() {
    const { router } = this.props;

    async function logout() {
      await fetch('/api/getSessions', {
        method: "DELETE",
      })
      router.push('/login')
    }
  
    return (
      <main>
                        
                <style jsx global>
                  {`
                      body {
                          background: black;
                          font-color:white;
                      }
                  `}
                </style>
      <div>
      <div className={styles.all}>
        <div className={styles.statsContainer}>
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
                <td>Cantidad de skins desbloqueadas: {this.props.skinCount}</td>
              </tr>
              <tr>
                <td>Cantidad de gorros desbloqueados: {this.props.hatCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        <div className={styles.flex}>
          <PPCButton
            func={() => router.push('/game')}
            image="./sprites/generalAssets/START GAME.png"
            st={{ width: '15%' }}
          />
          <PPCButton
            func={() => router.push('/profile')}
            image="./sprites/generalAssets/PROFILE.png"
            st={{ width: '15%' }}
          />
          <PPCButton
            func={() => router.push('/rankings')}
            image="./sprites/generalAssets/RANKINGS.png"
            st={{ width: '15%' }}
          />
          <PPCButton
            func={logout}
            image="./sprites/generalAssets/LOG-OUT.png"
            st={{ width: '15%' }}
          />
        </div>
        </div>
        </main>
    );
  }
  
}  

export default withRouter(Statistics);
