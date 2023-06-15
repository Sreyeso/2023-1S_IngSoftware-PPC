// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

//Class imports
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import { GetServerSideProps } from "next";
import Clients from "@/lib/models/user";

//Main sketch fuction (AKA Game)
const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
  require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
  return mod.default // returning react-p5 default export
}), {
  ssr: false    //Disable server side rendering
});

    //Preload
    const general_assets_names: string[] = ["exit.png","start.png", "GACHA.png", "PROFILE.png", "RANKINGS.png"];

    //Graphical assets
    let generalAssestsImages: p5.Image[] = []; //Loaded images of the skins
    let unknown: any; //Question mark sprite

    //Position and sizing of things (initial size, later changes in setup according to window size)
    let squareSize: number = 0;
    let spacing: number = 0;
    let startY: number = 0;
    let imageSize: number = 0;

  //Debug control
  const debug:boolean=false;

export default class App extends Component<Clients> {

  preload = (p5:p5) => {
    // Load graphical assets
    unknown = p5.loadImage('/sprites/generalAssets/unknown.png');
    for (let i = 0; i < general_assets_names.length; i++) { generalAssestsImages.push(p5.loadImage(`/sprites/generalAssets/${general_assets_names[i]}`)); }
  };

  windowResized = (p5:p5) =>  {
    //game.resize();  //Resize the game
    //p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
  };


  setup = (p5:p5, canvasParentRef: Element) => {
    //Initial setup
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  draw = (p5:p5) => {
    p5.background("white");

    //Buttons
    const startGameButton = p5.createButton("Start Game");
    startGameButton.position(100, 100);

    const profileButton = p5.createButton("Profile");
    profileButton.position(100, 150);

    const rankingButton = p5.createButton("Ranking");
    rankingButton.position(100, 200);

    const gachaButton = p5.createButton("Gacha");
    gachaButton.position(100, 250);
  };

  keyPressed = (p5: any) => {
  };

  mouseClicked = (p5: any) => {
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Sketch
            windowResized={this.windowResized}
            preload={this.preload}
            keyPressed={this.keyPressed}
            setup={this.setup}
            draw={this.draw}
            mouseClicked={this.mouseClicked}
          />
        </div>
      </div>
    );
  };

}