// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

//Class imports
import GameLogic from "./classes/GameLogic";

const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
    require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
    return mod.default // returning react-p5 default export
}),{
    ssr: false    //Disable server side rendering
});
//import Sketch from "react-p5";

// Graphic assets
const general_assets_names: string[] = ["pause.png"]
const player_names: string[] = ["default_ppc.png","la_creatura.png","love_letter.png","nyan_poptart.png","pollo.png","hypnotic_blue.gif","purple_toxic.png","sans.png"];
const defaultTile_names: string[] = ["000.png","flo.png","fil.png","pla.png","spi.gif","coi.gif","gem.gif","cll.png","clr.png","ds0.gif","ds1.png","ds2.png","d00.png","d01.png","d10.png","d11.png","sus.png","error.png"];

let generalAssets:any[]=[];

let player_Skins: any[]=[];
let defaultLevel_Graphics: any[]=[];
let desertLevel_Graphics: any[]=[];

let levelGraphics:any;
let levelLayouts :any;

//Main game object
let game:GameLogic;

//Debug control
const debug:boolean=false;

export default class App extends Component {

      preload = (p5:p5) => {
        levelLayouts=p5.loadJSON('/levelLayouts.json');
        // Load graphical assets
        for (let i = 0; i < general_assets_names.length; i++) {generalAssets.push(p5.loadImage(`/sprites/generalAssets/${general_assets_names[i]}`));}
        for (let i = 0; i < defaultTile_names.length; i++) {defaultLevel_Graphics.push(p5.loadImage(`/sprites/defaultLevel/${defaultTile_names[i]}`));}
        for (let i = 0; i < defaultTile_names.length; i++) {desertLevel_Graphics.push(p5.loadImage(`/sprites/desertLevel/${defaultTile_names[i]}`));}
        for (let i = 0; i < player_names.length; i++) {player_Skins.push(p5.loadImage(`/sprites/playerSkins/${player_names[i]}`));}
        levelGraphics=[defaultLevel_Graphics,desertLevel_Graphics];

      };

      windowResized = (p5:p5) =>  {
        game.resize();  //Resize the game
        p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
      };

      setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        //LOAD THE USER DATA INTO THESE VARIABLES OR DIRECTLY INTO THE GAME'S DECLARATION
        let userCoins=0;
        let userGems=0;
        let userSkinID=1;

        game = new GameLogic(
          {coins:userCoins,gems:userGems,image:player_Skins[userSkinID]}, //userData
          {playerSizeModifier:0.5,gravityModifier:0.0098,scrollSpeed:2}, //gameDetails
          generalAssets,levelGraphics,levelLayouts,p5);
    };

    draw = (p5:p5) => {
        p5.background('tomato');
        game.handleGame(debug);
    };

    keyPressed = (p5:p5) => {
      game.keyInteractions(p5.keyCode);
    }

    render() {
        return <Sketch preload={this.preload} windowResized={this.windowResized} setup={ this.setup } keyPressed={this.keyPressed} draw = { this.draw } />;
    };
}