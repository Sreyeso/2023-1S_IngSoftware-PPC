//Link vercel desarrollo : https://2023-1-s-ing-software-99kiat0q2-sreyeso.vercel.app/
// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5 from 'p5';
import Link from 'next/link';
import Image from 'next/image';
//Class imports
import GameLogic from "../lib/classes/GameLogic";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import { GetServerSideProps } from "next";
import Clients from "@/lib/models/user";
import Profile from "./profile";

import styles from '../styles/stats.module.css';
import { withRouter, NextRouter } from 'next/router';


// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => {

  // importing sound lib only after react-p5 is loaded
  require('p5/lib/addons/p5.sound');

  // returning react-p5 default export
  return mod.default
}), {
  ssr: false
});

//Server prop function (backend)

export async function getServerSideProps(ctx: { req: any; }) {
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
    // Get logged user
    const {req} = ctx;
    const userName:string= req.headers.user;
    let userData = await UDO.getUser(userName);

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
      props: { isConnected, userCoins, userGems, userSkin, maxScore, userName },
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

interface gameProps extends Clients {
  router: NextRouter;
}

class App extends Component<gameProps> {

      constructor(props:any) {
        super(props);
        // Bind the function to the class instance
        
        this.showMessageScreen = this.showMessageScreen.bind(this);
      }

      showMessageScreen(js:any) {
        console.log(js);
        // Call the function of the App class
        this.game.gameSounds[0].stop();
        this.game.playingMusic=false;
        
        if(this.gameFinished==true){
          let score =  (this.game.score > this.props.maxScore) ? (this.game.score) : (this.props.maxScore);
          let userName = this.props.userName;
          const updateUser = () => {
            fetch("/api/GameReq", {
              method: "PUT",
              body: JSON.stringify({
                "coins":this.game.collectedCoins,
                "gems":this.game.collectedGems,
                "score":score,
                "user":userName
              }),
              headers: {
                "content-type": "application/json",
              },
            }).catch((e) => console.log(e));
          };
          updateUser();
        }
      }

      general_assets_names: string[] = ["pause.png","exit.png","start.png"];
      defaultTile_names: string[] = ["000.png","flo.png","fil.png","pla.png","spb.gif","spl.gif","spr.gif","spt.gif","coi.gif","gem.gif","cll.png","clr.png","ds0.gif","ds1.png","ds2.png","d00.png","d01.png","d10.png","d11.png","sus.png","error.png","bg.png"];
      
      generalAssets:any[]=[];
      sound_names:string[] = ["FindPou_MP_ 6amerWa7cher1980_Zakeh.mp3","sm64coin.mp3","spyrogem.mp3","gmoddeath.mp3"];

      player_Skin: any;
      player_Hat: any;
      defaultLevel_Graphics: any[]=[];
      desertLevel_Graphics: any[]=[];
      hellLevel_Graphics: any[]=[];
  
      levelGraphics:any;
      levelLayouts :any;
      gameSounds: any[]=[];

      game:GameLogic|any=undefined;
      gameFinished:boolean|undefined=false;
      deathSound:boolean=false;

      //Debug control
      debug:boolean=false;

      preload = (p5:p5|any) => {
        this.levelLayouts=p5.loadJSON('/levelLayouts.json');
        // Load graphical assets
        for (let i = 0; i < this.general_assets_names.length; i++) {this.generalAssets.push(p5.loadImage(`/sprites/generalAssets/${this.general_assets_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.defaultLevel_Graphics.push(p5.loadImage(`/sprites/defaultLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.desertLevel_Graphics.push(p5.loadImage(`/sprites/desertLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.hellLevel_Graphics.push(p5.loadImage(`/sprites/hellLevel/${this.defaultTile_names[i]}`));}
        this.player_Skin=p5.loadImage(`/sprites/allSkins/${this.props.userSkin[0]}`);
        this.player_Hat=p5.loadImage(`/sprites/allHats/${this.props.userSkin[1]}`);
        for (let i = 0; i < this.sound_names.length; i++) {this.gameSounds.push(p5.loadSound(`/sounds/${this.sound_names[i]}`));}
        this.levelGraphics=[this.defaultLevel_Graphics,this.desertLevel_Graphics,this.hellLevel_Graphics];
      };

      windowResized = (p5:p5) =>  {
        if(this.game){
          p5.resizeCanvas(this.game.level.levelWidth-this.game.level.tile_size,this.game.level.levelHeight);  //Resize the canvas according to the viewable game size
        }
        
      };

      setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        this.game = new GameLogic(
          {userCoins:this.props.userCoins,userGems:this.props.userGems,skin:this.player_Skin,hat:this.player_Hat}, //userData
          {playerSizeModifier:0.5,gravityModifier:0.0098,maxscrollSpeed:5}, //gameDetails
          this.generalAssets,this.levelGraphics,this.levelLayouts,this.gameSounds,p5);
        p5.resizeCanvas(this.game.level.levelWidth-this.game.level.tile_size,this.game.level.levelHeight);  //Resize the canvas according to the viewable game size
    };

    draw = (p5:p5) => {
        p5.background('white');
        this.gameFinished=this.game.handleGame(this.debug);
        if(this.gameFinished && !this.deathSound){
          this.gameSounds[3].play();
          this.deathSound=true;
        }

    };

    keyPressed = (p5:p5) => {
      if(this.game){this.game.keyInteractions(p5.keyCode);}
      if(p5.keyCode && this.gameFinished==true){
        let score =  (this.game.score > this.props.maxScore) ? (this.game.score) : (this.props.maxScore);
        let userName = this.props.userName;
        const updateUser = () => {
          fetch("/api/GameReq", {
            method: "PUT",
            body: JSON.stringify({
              "coins":this.game.collectedCoins,
              "gems":this.game.collectedGems,
              "score":score,
              "user":userName
            }),
            headers: {
              "content-type": "application/json",
            },
          }).catch((e) => console.log(e));
        };
        updateUser();
        setTimeout(() => { location.reload(); }, 1000);
      }
    }

    render() {
      const { router } = this.props;

      async function logout() {
        await fetch('/api/getSessions', {
          method: "DELETE",
        });
        router.push('/login');
      }

        return (
          <main>
                        
                <style jsx global>
                  {`
                      body {
                          background: black;
                      }
                  `}
                </style>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', height: '60%' }}>
                <Sketch 
                  preload={this.preload}
                  setup={this.setup}
                  draw={this.draw}
                  windowResized={this.windowResized}
                  keyPressed={this.keyPressed}
                  
                />      
              </div>
              <div className={styles.flex}>
                  <div className = {styles.buttonContainer}>
                    <GachaButton showMessageScreen={this.showMessageScreen} />                                                                     
                  </div>
                  
                  <div className = {styles.buttonContainer}>
                  <ProfileButton showMessageScreen={this.showMessageScreen} />
                  </div>

                  <div className = {styles.buttonContainer}>
                  <CustomizeButton showMessageScreen={this.showMessageScreen} />
                  </div>
                  
                  <div className = {styles.buttonContainer}>
                  <RankingButton showMessageScreen={this.showMessageScreen} />
                  </div>

                  <div className = {styles.buttonContainer}>
                  <Link
                  className={styles.PPCButton}
                  style={{ width: '15%' }}
                  onClick={logout}
                  href={'/login'}
                  
                >
                  <img src={"/sprites/generalAssets/LOG-OUT.png"} alt="Logout Button" />
                </Link>
                </div>
                </div>          

            </div>
            </main>

            
        );
    };

}

type jsAnswer = {
    name: string;
}

type ButtonProps = {
  showMessageScreen: (js: jsAnswer) => void;
};

function StartButton(props: ButtonProps) {
  async function startGame() {
    props.showMessageScreen({ name: 'Iniciando Juego...' });
    window.location.href = '/game';
  }

  return(
    <Link
    className={styles.PPCButton}
    style={{ width: '15%' }}
    onClick = {startGame}
    href={'/game'}>
        <img src={"/sprites/generalAssets/START GAME.png"}></img>
    </Link>
  );
}

function CustomizeButton(props: ButtonProps) {
  async function openCustomization() {
    props.showMessageScreen({ name: 'Abriendo personalizacion...' });
    window.location.href = '/customization';
  }

  return(
    <Link
    className={styles.PPCButton}
    style={{ width: '15%' }}
    onClick = {openCustomization}
    href={'/customization'}>
        <img src={"/sprites/generalAssets/ASPECT.png"}></img>
    </Link>
  );
}

function ProfileButton(props: ButtonProps) {
  async function openProfile() {
    props.showMessageScreen({ name: 'Entrando al perfil del jugador...' });
    window.location.href = '/customization';
  }

  return(
    <Link
    className={styles.PPCButton}
    style={{ width: '15%' }}
    onClick = {openProfile}
    href={'/gacha'}>
        <img src={"/sprites/generalAssets/PROFILE.png"}></img>
    </Link>
  );
}

function GachaButton(props: ButtonProps) {
  async function openGacha() {
    props.showMessageScreen({ name: 'Entrando al GACHA...' });
    window.location.href = '/gacha';
  }

  return(
    <Link
    className={styles.PPCButton}
    style={{ width: '15%' }}
    onClick = {openGacha}
    href={'/gacha'}>
        <img src={"/sprites/generalAssets/GACHA.png"}></img>
    </Link>
  );
}

function RankingButton(props: ButtonProps) {
  async function openRanking() {
    props.showMessageScreen({ name: 'Entrando al Ranking...' });
    window.location.href = '/rankings';
  }


  return(
    <Link
    className={styles.PPCButton}
    style={{ width: '15%' }}
    onClick = {openRanking}
    href={'/rankings'}>
        <img src={"/sprites/generalAssets/RANKINGS.png"}></img>
    </Link>
  );
}

export default withRouter(App);