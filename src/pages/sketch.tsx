// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';
import Stack from '@mui/material/Stack';




//Class imports
import Level from "./classes/Level";
import Player from "./classes/Player";

const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
    require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
    return mod.default // returning react-p5 default export
}),{
    ssr: false    //Disable server side rendering
});
//import Sketch from "react-p5";

// Graphic assets
const graphicnames: string[] = ["grass.png", "dirt.png", "coin.gif", "gem.gif", "cloud_l.png",
                                "cloud_r.png", "flowers.gif", "pine_small.png", "pine_big_down.png", 
                                "pine_big_up.png", "tree_small.png", "tree_big_down.png", "tree_big_up.png", 
                                "stone.png", "spikes.png","empty.png", "error.png","pro.gif"];
const graphics: p5.Image[] = []; // Array where all the game-related graphical assets are stored

//Graphical control variables
let xOffset:number;
let yOffset:number;
let prevxOffset:number;
let prevyOffset:number;

//Main game objects
let lvl:Level;
let player:Player;

//Debug control
const debug:boolean=false;
/*
Things that the debug does:
- Show hitboxes
- 
*/





export default class App extends Component {

      preload = (p5:p5) => {
        for (let i = 0; i < graphicnames.length; i++) {
          //Load all of the sprites into the graphics 
          graphics[i] = p5.loadImage(`/sprites/${graphicnames[i]}`);
        }
      };

      windowResized = (p5:p5) =>  {
        //Calculate new centering adjustment for the current level based on its size
        xOffset = (p5.windowWidth - lvl.levelWidth) / 2;
        yOffset = (p5.windowHeight - lvl.levelHeight) / 2;

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

        //Initial declaration of a template level
        lvl = new Level(
          10,20,
          [   "000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
              "000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
              "000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
              "000","000","000","000","000","000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000",
              "000","000","000","000","000","000","sto","sto","sto","000","000","000","000","tbu","coi","gem","pbu","000","000","000",
              "000","000","000","000","000","000","000","000","000","000","000","000","000","tbd","000","000","pbd","000","000","000",
              "000","000","000","000","tbu","000","000","000","000","000","000","000","gra","gra","gra","gra","gra","000","000","000",
              "000","flo","000","psm","tbd","000","000","000","000","spi","000","gra","dir","dir","dir","dir","dir","gra","000","flo",
              "gra","gra","gra","gra","gra","gra","gra","gra","gra","gra","gra","dir","dir","dir","dir","dir","dir","dir","gra","gra",
              "dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir"],
          40,
          graphics,
          p5
        );

        //Initialize offset for this template level
        xOffset = (p5.windowWidth - lvl.levelWidth) / 2;
        yOffset = (p5.windowHeight - lvl.levelHeight) / 2;
        prevxOffset=xOffset;
        prevyOffset=yOffset;
        //Position the player in the template level
        player = new Player(20,20,xOffset + (9) * lvl.tile_size,yOffset,graphics[17],p5);
    };

    draw = (p5:p5) => {
        p5.background('tomato');
        //Draw the elements of the game
        lvl.draw(xOffset,yOffset,debug);
        player.draw();
        lvl.handleCollisions(player,xOffset,yOffset);
        //Enable pllayer movement
        if(player.isAlive){
          player.update();
          player.keyMovement();
        }else{
          p5.push();
            p5.noStroke();
            p5.fill(200,125);//Gray out the screen
            p5.rect(xOffset, yOffset, lvl.levelWidth, lvl.levelHeight); 
          p5.pop();
        }
        
    };

    keyPressed = (p5:p5) => {
      if (p5.keyCode == p5.UP_ARROW) {
        player.isJumping=true;
      } 
    }

    render() {
        return (<div><Sketch preload={this.preload} windowResized={this.windowResized} setup={ this.setup } keyPressed={this.keyPressed} draw = { this.draw } /> <Stack spacing={2} direction="row">
        <button><img src="./sprites/start_game.png" alt="Iniciar Juego"/></button>
        <button><img src="./sprites/profile.png" alt="Perfil"/></button>
        <a href="\leaderboard"><button><img src="./sprites/rankings.png" alt="Rankings"/></button></a>
        <button><img src="./sprites/gacha.png" alt="Gacha"/></button>
        </Stack></div>);
    };
}


