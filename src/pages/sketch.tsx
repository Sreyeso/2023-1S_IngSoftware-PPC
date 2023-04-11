import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; //Import this for typechecking and intellisense
//import Sketch from "react-p5";
// Will only import `react-p5` on client-side
import Level from "./classes/Level";

const Sketch = dynamic(() => import("react-p5").then((mod) => {
    // importing sound lib only after react-p5 is loaded
    require('p5/lib/addons/p5.sound');
    // returning react-p5 default export
    return mod.default
}), {
    ssr: false
});
//import Sketch from "react-p5";

let width: number;
let height: number;
let lvl: Level;

let player: {
    x: number;
    y: number;
    width: number;
    height: number;
    prevX: number;
    prevY: number;
  };
let vel: number;

  // Graphic assets
let grass:any;
let dirt:any;
let coin:any;
let gem:any;
let cloud_l:any;
let cloud_r:any;
let flowers:any;
let pine_small:any;
let pine_big_down:any;
let pine_big_up:any;
let tree_small:any;
let tree_big_down:any;
let tree_big_up:any;
let stone:any;
let spikes:any;
let error:any;


export default class Coso extends Component {

    windowResized = p5 =>  {
        width = p5.windowWidth;
        height = p5.windowHeight;
      }

    movePlayer = (dx: number, dy: number) => {
        // update the player's previous position
        player.prevX = player.x;
        player.prevY = player.y;
      
        // update the player's current position
        player.x += dx;
        player.y += dy;
      }

    handleCollisions= () => {
        // calculate the player's bounding box
        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerTop = player.y;
        let playerBottom = player.y + player.height;
      
        // loop through the grid array and check for collisions
        for (let i = 0; i < lvl.rows; i++) {
          for (let j = 0; j < lvl.cols; j++) {
            if (lvl.layout[i][j].type == 0) { // solid tile
              // calculate the bounding box of the tile
              let tileLeft = (1/3)*width + (j * lvl.size);
              let tileRight = (1/3)*width +(j * lvl.size + lvl.size);
              let tileTop = (1/3)*height+ (i * lvl.size);
              let tileBottom = (1/3)*height+(i * lvl.size + lvl.size);
      
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
      }

      preload = p5 => {
        p5.loadImage("https://art.pixilart.com/sr29f986e1c0554.png",s=>{grass=s});
        //p5.loadImage("https://art.pixilart.com/sr2eb1f201a0f54.png",s=>{dirt=s});
        p5.loadImage("/sprites/dirt.png",s=>{dirt=s});
        p5.loadImage("https://art.pixilart.com/sr23b57c326b49a.gif",s=>{coin=s});
        p5.loadImage("https://art.pixilart.com/sr2e94c7bca31f8.gif",s=>{gem=s});
        p5.loadImage("https://art.pixilart.com/sr2c159e6312df2.png",s=>{cloud_l=s});
        p5.loadImage("https://art.pixilart.com/sr2bc6f8384372a.png",s=>{cloud_r=s});
        p5.loadImage("https://art.pixilart.com/sr25fa2ac0990a3.gif",s=>{flowers=s});
        p5.loadImage("https://art.pixilart.com/sr2a39c0606f47d.png",s=>{pine_small=s});
        p5.loadImage("https://art.pixilart.com/sr209c98e5a8eba.png",s=>{pine_big_down=s});
        p5.loadImage("https://art.pixilart.com/sr2cde46bcdf53c.png",s=>{pine_big_up=s});
        p5.loadImage("https://art.pixilart.com/sr25fe1849198a3.png",s=>{tree_small=s});
        p5.loadImage("https://art.pixilart.com/sr2b444e168cf5b.png",s=>{tree_big_down=s});
        p5.loadImage("https://art.pixilart.com/sr237a4e3fbb418.png",s=>{tree_big_up=s});
        p5.loadImage("https://art.pixilart.com/sr215d2807ffe12.png",s=>{stone=s});
        p5.loadImage("https://art.pixilart.com/sr24b9234e23159.png",s=>{spikes=s});
        p5.loadImage("https://steamuserimages-a.akamaihd.net/ugc/934934926476985171/5182552889AF62A2AE66B8C79CD41D1FF66B03AD/?imw=512&imh=511&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",s=>{error=s});
      }

      setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        p5.frameRate(60);
        p5.background("tomato");
        
        width = p5.windowWidth;
        height = p5.windowHeight;
        lvl = new Level(
          10,
          20,
          [
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1, 4, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1, 4, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,13,13,13,-1,-1,-1,-1,12, 2,-1, 3,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,-1,-1,-1, 6,-1,-1,
            -1,-1,-1,-1, 9,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,
            -1, 6,-1, 7, 8,-1,-1,-1,-1,14,-1, 0, 1, 1, 1, 1, 1, 1, 0, 6,
             0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
             1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          30,
          p5,
          //0     1    2    3    4        5        6        7          8             9          10         11            12        13    14    15
          [grass,dirt,coin,gem,cloud_l,cloud_r,flowers,pine_small,pine_big_down,pine_big_up,tree_small,tree_big_down,tree_big_up,stone,spikes,error]
        );
        player = {
          x: (1 / 3) * width + (lvl.cols / 2) * lvl.size,
          y: (1 / 3) * height,
          width: 20,
          height: 20,
          prevX: 0,
          prevY: 0,
        };
    };

    draw = p5 => {
        this.windowResized;
        p5.background('tomato');

        lvl.draw();
        p5.push();
            p5.fill('red');
            p5.rect(player.x, player.y, player.width, player.height);
        p5.pop();
        this.movePlayer(0,2);
        this.handleCollisions();
    };

    render() {
        return <Sketch preload={this.preload} setup={ this.setup } draw = { this.draw } />;
    }
}