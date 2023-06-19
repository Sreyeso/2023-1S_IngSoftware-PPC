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

export default class App extends Component<Clients> {

      general_assets_names: string[] = ["pause.png","exit.png","start.png"];
      defaultTile_names: string[] = ["000.png","flo.png","fil.png","pla.png","spb.gif","spl.gif","spr.gif","spt.gif","coi.gif","gem.gif","cll.png","clr.png","ds0.gif","ds1.png","ds2.png","d00.png","d01.png","d10.png","d11.png","sus.png","error.png","bg.png"];
      
      generalAssets:any[]=[];
      sound_names:string[] = ["main.mp3","boing2.mp3"];

      player_Skin: any;
      defaultLevel_Graphics: any[]=[];
      desertLevel_Graphics: any[]=[];
      hellLevel_Graphics: any[]=[];
  
      levelGraphics:any;
      levelLayouts :any;
      gameSounds: any[]=[];

      game:GameLogic|any=undefined;
      gameFinished:boolean|undefined=false;

      //Debug control
      debug:boolean=false;

      preload = (p5:p5|any) => {
        this.levelLayouts=p5.loadJSON('/levelLayouts.json');
        // Load graphical assets
        for (let i = 0; i < this.general_assets_names.length; i++) {this.generalAssets.push(p5.loadImage(`/sprites/generalAssets/${this.general_assets_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.defaultLevel_Graphics.push(p5.loadImage(`/sprites/defaultLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.desertLevel_Graphics.push(p5.loadImage(`/sprites/desertLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.hellLevel_Graphics.push(p5.loadImage(`/sprites/hellLevel/${this.defaultTile_names[i]}`));}
        //for (let i = 0; i < this.player_names.length; i++) {this.player_Skins.push(p5.loadImage(`/sprites/playerSkins/${this.player_names[i]}`));}
        this.player_Skin=p5.loadImage(`/sprites/allSkins/${this.props.userSkin[0]}`);
        for (let i = 0; i < this.sound_names.length; i++) {this.gameSounds.push(p5.loadSound(`/sounds/${this.sound_names[i]}`));}
        this.levelGraphics=[this.defaultLevel_Graphics,this.desertLevel_Graphics,this.hellLevel_Graphics];
      };

      windowResized = (p5:p5) =>  {
        //game.resize();  //Resize the game
        //p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
      };

      setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        this.game = new GameLogic(
          {userCoins:this.props.userCoins,userGems:this.props.userGems,image:this.player_Skin}, //userData
          {playerSizeModifier:0.5,gravityModifier:0.0098,maxscrollSpeed:5}, //gameDetails
          this.generalAssets,this.levelGraphics,this.levelLayouts,this.gameSounds,p5);
        p5.resizeCanvas(this.game.level.levelWidth-this.game.level.tile_size,this.game.level.levelHeight);  //Resize the canvas according to the viewable game size
    };

    draw = (p5:p5) => {
        p5.background('white');
        this.gameFinished=this.game.handleGame(this.debug);
    };

    keyPressed = (p5:p5) => {
      if(this.game){this.game.keyInteractions(p5.keyCode);}
      if(p5.keyCode && this.gameFinished==true){
        let score =  (this.game.score > this.props.maxScore) ? (this.game.score) : (this.props.maxScore);
        const updateUser = () => {
          fetch("/api/GameReq", {
            method: "PUT",
            body: JSON.stringify({
              "coins":this.game.collectedCoins,
              "gems":this.game.collectedGems,
              "score":score
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

        return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', height: '60vh' }}>
                <Sketch 
                  preload={this.preload}
                  setup={this.setup}
                  draw={this.draw}
                  windowResized={this.windowResized}
                  keyPressed={this.keyPressed}
                  
                />      
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
                       <GachaButton/>
                      <ProfileButton/>
                      <RankingButton/>
                </div>          
              
            </div>
        );
    };

}

type jsAnswer = {
    name: string;
}
function StartButton(){
    //Cuando se presiona el botón, se redirecciona al juego

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }   

    async function startGame(){
        showMessageScreen({name: "Iniciando Juego..."})
    }

    return (
        <Link
            href="/game" 
            className="btn btn-primary button"
            onClick={startGame}
        >
            <Image src = '/assets/START GAME.png' alt="lol,lmao"></Image>    
        </Link>
    );
}
function ProfileButton(){
    //Cuando se presiona el botón, se redirecciona al perfil del jugador

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openProfile(){
        showMessageScreen({name: "Entrando al perfil del jugador..."})
    }
    
    return (
        <Link 
            href="/customization" 
            className="btn btn-primary button"
            onClick={openProfile}
        >
            <Image src = '/assets/PROFILE.png'alt="lol,lmao"></Image> 
        </Link>
    );
}
function GachaButton(){
    //Cuando se presiona el botón, se redirecciona al juego

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openGacha(){
        showMessageScreen({name: "Entrando al GACHA..."})
    }
    
    return (
        <Link 
            href="/gacha" 
            className="btn btn-primary button"
            onClick={openGacha}
        >
            <Image src = '/assets/GACHA.png'alt="lol,lmao"></Image> 
        </Link>
    );
}
function RankingButton(){
    //Cuando se presiona el botón, se redirecciona al juego

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openRanking(){
        showMessageScreen({name: "Entrando a el Ranking..."})
        open('/sketch')
    }
    
    return (
        <Link 
            href="/rankings" 
            className="btn btn-primary button"
        >
            <Image src = '/assets/RANKINGS.png'alt="lol,lmao"></Image>   
        </Link>
    );
}

