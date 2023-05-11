// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

//Class imports
import Level from "./classes/Level";
import Player from "./classes/Player";
import GameLogic from "./classes/GameLogic";

const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
    require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
    return mod.default // returning react-p5 default export
}),{
    ssr: false    //Disable server side rendering
});
//import Sketch from "react-p5";

// Graphic assets
const player_names: string[] = ["default_ppc.png","la_creatura.png","love_letter.png","nyan_poptart.png","pollo.png","hypnotic_blue.gif","purple_toxic.png","sans.png"];
const defaultTile_names: string[] = ["000.png","flo.png","fil.png","pla.png","spi.png","coi.gif","gem.gif","cll.png","clr.png","ds0.gif","ds1.png","ds2.png","d00.png","d01.png","d10.png","d11.png","error.png"];

const player_Skins: p5.Image[] = [];
const defaultLevel_Graphics: p5.Image[] = [];
const desertLevel_Graphics: p5.Image[] = [];

//Graphical control variables
let xOffset:number;
let yOffset:number;
let prevxOffset:number;
let prevyOffset:number;

//Main game objects
let level:Level;
let player:Player;
let testrawlayout:string[];
let game:GameLogic;

//Debug control
const debug:boolean=true;

export default class App extends Component {

      preload = (p5:p5) => {
        // Load graphical assets
        for (let i = 0; i < defaultTile_names.length; i++) {defaultLevel_Graphics[i] = p5.loadImage(`/sprites/defaultLevel/${defaultTile_names[i]}`);}
        for (let i = 0; i < player_names.length; i++) {player_Skins[i] = p5.loadImage(`/sprites/playerSkins/${player_names[i]}`);}
      };

      windowResized = (p5:p5) =>  {
        //Calculate new centering adjustment for the current level based on its size
        xOffset = (p5.windowWidth - level.levelWidth) / 2;
        yOffset = (p5.windowHeight - level.levelHeight) / 2;

        //Adjust the player accordingly based on the size changes
        player.movePlayer(xOffset-prevxOffset,yOffset-prevyOffset);

        //Resize the canvas
        p5.resizeCanvas(p5.windowWidth,p5.windowHeight);

        //Save the new value of the offset
        prevxOffset=xOffset;
        prevyOffset=yOffset;
      };

      setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        p5.background("tomato");

        //Initial declaration of the starting level
        level = new Level({rows:10,cols:21,
          rawLayout:[ "000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                      "000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                      "000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                      "000","000","000","000","000","000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000","000",
                      "000","000","000","000","000","000","000","000","000","pla","000","000","000","d01","coi","gem","d11","000","000","000","000",
                      "000","000","000","000","000","000","000","000","000","000","000","000","000","d00","000","000","d10","000","000","000","000",
                      "000","000","000","000","d01","000","000","000","000","000","000","000","flo","flo","flo","flo","flo","000","000","000","000",
                      "000","ds0","spi","ds1","d00","000","000","ds2","000","000","000","flo","fil","fil","fil","fil","fil","flo","000","ds0","000",
                      "flo","flo","flo","flo","flo","flo","flo","flo","flo","flo","flo","fil","fil","fil","fil","fil","fil","fil","flo","flo","flo",
                      "fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil"],
            tile_size:60,
          images:defaultLevel_Graphics},
          p5
        );

        //template 
        testrawlayout=[ "000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                        "000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                        "000","000","000","000","000","000","000","000","gem","gem","gem","000","000","000","000","000","000","000","000","000","000",
                        "000","000","000","000","coi","000","000","000","000","spi","000","000","000","000","coi","coi","000","000","000","000","000",
                        "000","000","000","000","000","000","000","000","pla","pla","pla","000","000","d01","coi","coi","d11","000","000","000","000",
                        "000","000","000","flo","flo","flo","000","000","000","000","000","000","000","d00","000","000","d10","000","000","000","000",
                        "000","000","flo","fil","fil","fil","flo","spi","000","000","000","spi","flo","flo","flo","flo","flo","000","000","000","000",
                        "000","flo","fil","fil","fil","fil","fil","flo","spi","spi","spi","flo","fil","fil","fil","fil","fil","flo","000","ds0","000",
                        "flo","fil","fil","fil","fil","fil","fil","fil","flo","flo","flo","fil","fil","fil","fil","fil","fil","fil","flo","flo","flo",
                        "fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil","fil"];

        //Initialize offset for the level adjustments
        xOffset = (p5.windowWidth - level.levelWidth + level.tile_size)/ 2;
        yOffset = (p5.windowHeight - level.levelHeight) / 2;
        prevxOffset=xOffset;
        prevyOffset=yOffset;

        //Initial declaration of the player
        player = new Player({width : level.tile_size*0.5,
                            height : level.tile_size*0.5,
                            gravity : level.tile_size*0.0098,
                            jumpVelocity : -level.tile_size*0.2,
                            speed : 5,
                            jumps : 2,
                            initialX : xOffset + (10) * level.tile_size,
                            initialY : yOffset + (1) * level.tile_size,
                            coins:0,
                            gems:0,
                            image : player_Skins[5]},
                            p5);

        game = new GameLogic(player,level,2);
        game.setNextLevel(testrawlayout,1);
    };

    draw = (p5:p5) => {
        p5.background('tomato');
        game.handleGame(xOffset,yOffset,debug);
        p5.push();
          p5.textSize(level.tile_size);
          p5.text("Monedas: "+player.coins+"               -                 Gemas: "+player.gems,xOffset+level.tile_size,yOffset+level.levelHeight+level.tile_size);
          p5.text(game.pauseCooldown,xOffset+level.levelWidth-170,yOffset+70);
        p5.pop();
    };

    keyPressed = (p5:p5) => {
      game.keyInteractions(p5.keyCode,p5);
    }

    render() {
        return <Sketch preload={this.preload} windowResized={this.windowResized} setup={ this.setup } keyPressed={this.keyPressed} draw = { this.draw } />;
    };
}