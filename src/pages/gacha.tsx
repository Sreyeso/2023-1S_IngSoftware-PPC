// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; // Import this for typechecking and intellisense
import p5 from 'p5';

//Class imports
import GameLogic from "../lib/classes/GameLogic";
import DBO from "@/lib/utils/dbo";
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
      
    };

    windowResized = (p5:p5) =>  {
        //game.resize();  //Resize the game
        //p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
    };

    setup = (p5:p5, canvasParentRef:Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    };

    draw = (p5:p5) => {
        p5.background('pink');
    };

    keyPressed = (p5:p5) => {
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

