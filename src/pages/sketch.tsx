//Link vercel desarrollo : https://2023-1-s-ing-software-99kiat0q2-sreyeso.vercel.app/
// Framework Imports
//Vercel gamong
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

//Class imports
import GameLogic from "../lib/classes/GameLogic";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import { GetServerSideProps } from "next";
import Clients from "@/lib/models/user";

//Main sketch fuction (AKA Game)
const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
    require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
    return mod.default // returning react-p5 default export
}),{
    ssr: false    //Disable server side rendering
});
//import Sketch from "react-p5";

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
    let userCoins:number =userData.CoinAmount;
    let userGems:number=userData.GemAmount;
    let userSkin:number =userData.CurrentAspect;
    let maxScore:number =userData.HiScore;
    //added connection close, but it lacks proper handling of errors and conditions
    if(userData){
      //DB.end();
    }
    else{
      console.log("ERROR FETHCING USER DATA")
    }

    return {
      props: { isConnected: true, userCoins:userCoins, userGems:userGems ,userSkin:userSkin,maxScore:maxScore},
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default class App extends Component<Clients> {

      
      // Graphic assets
      general_assets_names: string[] = ["pause.png","exit.png","start.png"]
      player_names: string[] = ["default_ppc.png","la_creatura.png","love_letter.png","nyan_poptart.png","pollo.png","hypnotic_blue.gif","purple_toxic.png","sans.png"];
      defaultTile_names: string[] = ["000.png","flo.png","fil.png","pla.png","spb.gif","spl.gif","spr.gif","spt.gif","coi.gif","gem.gif","cll.png","clr.png","ds0.gif","ds1.png","ds2.png","d00.png","d01.png","d10.png","d11.png","sus.png","error.png","bg.png"];

      generalAssets:any[]=[];

      player_Skins: any[]=[];
      defaultLevel_Graphics: any[]=[];
      desertLevel_Graphics: any[]=[];
      hellLevel_Graphics: any[]=[];
  
      levelGraphics:any;
      levelLayouts :any;

      //Main game object
      game:GameLogic|any=undefined;
      gameFinished:boolean|undefined=false;
      resultsLogged:boolean=false;

      //Debug control
      debug:boolean=false;

      preload = (p5:p5) => {
        this.levelLayouts=p5.loadJSON('/levelLayouts.json');
        // Load graphical assets
        for (let i = 0; i < this.general_assets_names.length; i++) {this.generalAssets.push(p5.loadImage(`/sprites/generalAssets/${this.general_assets_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.defaultLevel_Graphics.push(p5.loadImage(`/sprites/defaultLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.desertLevel_Graphics.push(p5.loadImage(`/sprites/desertLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.defaultTile_names.length; i++) {this.hellLevel_Graphics.push(p5.loadImage(`/sprites/hellLevel/${this.defaultTile_names[i]}`));}
        for (let i = 0; i < this.player_names.length; i++) {this.player_Skins.push(p5.loadImage(`/sprites/playerSkins/${this.player_names[i]}`));}
        this.levelGraphics=[this.defaultLevel_Graphics,this.desertLevel_Graphics,this.hellLevel_Graphics];

      };

      windowResized = (p5:p5) =>  {
        //game.resize();  //Resize the game
        //p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
      };

      setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        this.game = new GameLogic(
          {userCoins:this.props.userCoins,userGems:this.props.userGems,image:this.player_Skins[this.player_names.indexOf(this.props.userSkin)]}, //userData
          {playerSizeModifier:0.5,gravityModifier:0.0098,maxscrollSpeed:5}, //gameDetails
          this.generalAssets,this.levelGraphics,this.levelLayouts,p5);

        p5.resizeCanvas(this.game.level.levelWidth-this.game.level.tile_size,this.game.level.levelHeight);  //Resize the canvas according to the viewable game size
    };

    draw = (p5:p5) => {
        p5.background('white');
        this.gameFinished=this.game.handleGame(this.debug);
        if(this.gameFinished==true && this.resultsLogged==false){

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
          this.resultsLogged=true;
        }

    };

    keyPressed = (p5:p5) => {
      if(this.game){this.game.keyInteractions(p5.keyCode);}
      if(p5.keyCode && this.gameFinished==true && this.resultsLogged==true){
        location.reload();
      }
    }

    render() {

        return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Sketch 
                  preload={this.preload}
                  setup={this.setup}
                  windowResized={this.windowResized}
                  keyPressed={this.keyPressed}
                  draw={this.draw}
                />
              </div>
            </div>
        );
    };

}

