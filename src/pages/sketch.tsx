// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

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
                                "stone.png", "spikes.png","empty.png", "error.png"];
const graphics: p5.Image[] = []; // Array where all the game-related graphical assets are stored

//Graphical control variables
let xOffset:number;
let yOffset:number;
let prevxOffset:number;
let prevyOffset:number;

//Main game objects
let lvl:Level;
let player:Player;

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

        //Position the player in the tempate level
        player = new Player(20,20,xOffset + (lvl.cols / 2) * lvl.tile_size,yOffset,p5);
    };

    draw = (p5:p5) => {
        p5.background('tomato');

        //Draw the elements of the game
        lvl.draw(xOffset,yOffset);
        player.draw();
        

        //Call the functionality of the game
        player.movePlayer(0,2);
        this.handleCollisions(player,xOffset,yOffset);
    };

    handleCollisions= (player:Player,xOffset:number,yOffset:number) => {
      // calculate the player's bounding box
      let playerLeft = player.x;
      let playerRight = player.x + player.width;
      let playerTop = player.y;
      let playerBottom = player.y + player.height;
    
      // loop through the grid array and check for collisions
      for (let i = 0; i < lvl.rows; i++) {
        for (let j = 0; j < lvl.cols; j++) {
          if (lvl.layout[i][j].code == "gra") { // grass tile
            // calculate the bounding box of the tile
            let tileLeft = xOffset + (j * lvl.tile_size);
            let tileRight = xOffset +(j * lvl.tile_size + lvl.tile_size);
            let tileTop = yOffset+ (i * lvl.tile_size);
            let tileBottom = yOffset+(i * lvl.tile_size + lvl.tile_size);
    
            // check if the player's bounding box overlaps with the tile's bounding box
            if (playerLeft < tileRight && playerRight > tileLeft && playerTop < tileBottom && playerBottom > tileTop) {
              // there is a collision!
              // reset the player's position to their previous position
              player.x = player.prevX;
              player.y = player.prevY;
            }
          }
        }
      }
    };

    render() {
        return <Sketch preload={this.preload} windowResized={this.windowResized}setup={ this.setup } draw = { this.draw } />;
    };
}