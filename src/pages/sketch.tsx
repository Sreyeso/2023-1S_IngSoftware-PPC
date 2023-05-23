// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

//Class imports
import GameLogic from "./classes/GameLogic";
import DBO from "@/lib/dbo";
import UserModel from "@/lib/models/user";
import { GetServerSideProps } from "next";

//Main sketch fuction (AKA Game)
const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
    require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
    return mod.default // returning react-p5 default export
}),{
    ssr: false    //Disable server side rendering
});
//import Sketch from "react-p5";

// Graphic assets
const general_assets_names: string[] = ["pause.png","exit.png","start.png"]
const player_names: string[] = ["default_ppc.png","la_creatura.png","love_letter.png","nyan_poptart.png","pollo.png","hypnotic_blue.gif","purple_toxic.png","sans.png"];
const defaultTile_names: string[] = ["000.png","flo.png","fil.png","pla.png","spb.gif","spl.gif","spr.gif","spt.gif","coi.gif","gem.gif","cll.png","clr.png","ds0.gif","ds1.png","ds2.png","d00.png","d01.png","d10.png","d11.png","sus.png","error.png","bg.png"];

let generalAssets:any[]=[];

let player_Skins: any[]=[];
let defaultLevel_Graphics: any[]=[];
let desertLevel_Graphics: any[]=[];
let hellLevel_Graphics: any[]=[];

let levelGraphics:any;
let levelLayouts :any;

//Main game object
let game:GameLogic;
let gameFinished:boolean|undefined=false;
let resultsLogged:boolean=false;

//Debug control
const debug:boolean=false;

//Server prop function (backend)

export async function getServerSideProps() {
  try {
    //Database object
    const DB:DBO=new DBO();
    //User data object
    const UDO=new UserModel(DB.db);
    let userData=await UDO.getUser("bingus");
    //let userSkin=await 
    //retorno Objid, id in array, name ...
    return {
      props: { isConnected: true, userCoins:userData.CoinAmount , userGems:userData.GemAmount ,userSkin:userData.CurrentAspect,maxScore:userData.HiScore},
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}



export default class App extends Component {

      preload = (p5:p5) => {
        levelLayouts=p5.loadJSON('/levelLayouts.json');
        // Load graphical assets
        for (let i = 0; i < general_assets_names.length; i++) {generalAssets.push(p5.loadImage(`/sprites/generalAssets/${general_assets_names[i]}`));}
        for (let i = 0; i < defaultTile_names.length; i++) {defaultLevel_Graphics.push(p5.loadImage(`/sprites/defaultLevel/${defaultTile_names[i]}`));}
        for (let i = 0; i < defaultTile_names.length; i++) {desertLevel_Graphics.push(p5.loadImage(`/sprites/desertLevel/${defaultTile_names[i]}`));}
        for (let i = 0; i < defaultTile_names.length; i++) {hellLevel_Graphics.push(p5.loadImage(`/sprites/hellLevel/${defaultTile_names[i]}`));}
        for (let i = 0; i < player_names.length; i++) {player_Skins.push(p5.loadImage(`/sprites/playerSkins/${player_names[i]}`));}
        levelGraphics=[defaultLevel_Graphics,desertLevel_Graphics,hellLevel_Graphics];

      };

      windowResized = (p5:p5) =>  {
        //game.resize();  //Resize the game
        //p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
      };

      setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        game = new GameLogic(
          {userCoins:this.props.userCoins,userGems:this.props.userGems,image:player_Skins[7]}, //userData
          {playerSizeModifier:0.5,gravityModifier:0.0098,maxscrollSpeed:5}, //gameDetails
          generalAssets,levelGraphics,levelLayouts,p5);

          p5.resizeCanvas(game.level.levelWidth-game.level.tile_size,game.level.levelHeight);  //Resize the canvas according to the viewable game size
    };

    draw = (p5:p5) => {
        p5.background('white');
        gameFinished=game.handleGame(debug);
        if(gameFinished==true && resultsLogged==false){

        let score =  (game.score > this.props.maxScore) ? (game.score) : (this.props.maxScore);

          const updateUser = () => {
            fetch("http://localhost:3000/api/GameReq", {
              method: "PUT",
              body: JSON.stringify({
                "coins":game.collectedCoins,
                "gems":game.collectedGems,
                "score":score
              }),
              headers: {
                "content-type": "application/json",
              },
            }).catch((e) => console.log(e));
          };
          updateUser();
          resultsLogged=true;
        }

    };

    keyPressed = (p5:p5) => {
      game.keyInteractions(p5.keyCode);
      if(p5.keyCode && gameFinished==true && resultsLogged==true){
        location.reload();
      }
    }

    render() {

        return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Sketch 
                  preload={this.preload}
                  windowResized={this.windowResized}
                  setup={this.setup}
                  keyPressed={this.keyPressed}
                  draw={this.draw}
                />
              </div>
            </div>
        );
    };

}

