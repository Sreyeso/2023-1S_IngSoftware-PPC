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
const graphicnames: string[] = ["grass.png", "dirt.png", "coin.gif", "gem.gif", "cloud_l.png",
                                "cloud_r.png", "flowers.gif", "pine_small.png", "pine_big_down.png", 
                                "pine_big_up.png", "tree_small.png", "tree_big_down.png", "tree_big_up.png", 
                                "stone.png", "spikes.png","empty.png", "error.png","pro.gif","barrier.png"];
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
const debug:boolean=true;
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
        lvl = new Level({rows:12,cols:21,
          rawLayout:[ "111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111",
                      "111","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                      "111","000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                      "111","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000","000",
                      "111","000","000","000","000","000","000","000","cll","clr","000","000","000","000","000","000","000","000","000","000","000",
                      "111","000","000","000","000","000","000","000","000","000","sto","000","000","000","tbu","coi","gem","pbu","000","000","000",
                      "111","000","000","000","000","000","000","000","000","000","000","000","000","000","tbd","000","000","pbd","000","000","000",
                      "111","000","000","000","000","tbu","000","000","000","000","000","000","000","gra","gra","gra","gra","gra","000","000","000",
                      "111","000","flo","spi","psm","tbd","000","000","000","000","000","000","gra","dir","dir","dir","dir","dir","gra","000","flo",
                      "111","gra","gra","gra","gra","gra","gra","gra","gra","gra","gra","gra","dir","dir","dir","dir","dir","dir","dir","gra","gra",
                      "111","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir","dir",
                      "111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111","111"],
            tile_size:70,
          images:graphics},
          p5
        );

        //Initialize offset for this template level
        xOffset = (p5.windowWidth - lvl.levelWidth-(1 * lvl.tile_size)) / 2;
        yOffset = (p5.windowHeight - lvl.levelHeight-(1 * lvl.tile_size)) / 2;
        prevxOffset=xOffset;
        prevyOffset=yOffset;
        //Position the player in the template level
        player = new Player({width : lvl.tile_size*0.5,
                            height : lvl.tile_size*0.5,
                            gravity : lvl.tile_size*0.0098,
                            jumpVelocity : -lvl.tile_size*0.2,
                            speed : 5,
                            jumps : 2,
                            initialX : xOffset + (10) * lvl.tile_size,
                            initialY : yOffset,
                            image : graphics[17]},
                            p5);
    };

    draw = (p5:p5) => {
        p5.background('tomato');
        //Draw the elements of the game
        lvl.draw(xOffset,yOffset,debug);
        player.draw();
        GameLogic.handleCollisions(player,lvl,xOffset,yOffset,debug);
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
        return <Sketch preload={this.preload} windowResized={this.windowResized} setup={ this.setup } keyPressed={this.keyPressed} draw = { this.draw } />;
    };
}