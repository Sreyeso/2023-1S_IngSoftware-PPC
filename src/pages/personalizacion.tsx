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
}),{
    ssr: false    //Disable server side rendering
});
//import Sketch from "react-p5";

export async function getServerSideProps() {
  try {
    //Database object
    const DB:DBO=new DBO();
    //User data object
    const UDO=new UserModel(DB.db);
    let userData=await UDO.getUser("bingus");
    //let userSkin=await 
    //retorno Objid, id in array, name ...

    let userSkin:number =userData.CurrentAspect;
    let unlockedAspects:string[] =userData.GachaObjects;
    //added connection close, but it lacks proper handling of errors and conditions
    if(userData){
      //DB.end();
    }
    else{
      console.log("ERROR FETHCING USER DATA")
    }

    return {
      props: { isConnected: true,userSkin:userSkin,gachaObjects:unlockedAspects},
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default class App extends Component<Clients> {

    bgShadeOfGray:number=200;

    currentHat:any;
    currentSkin:any;
    currentSkinIndex: number = 0; // Current index in the skin array
    currentHatIndex: number = 0; // Current index in the hat array
    lastKeyPressTimeHat: number =0;
    lastKeyPressTimeSkin: number =0;
    skin_names: string[] = []; // File names of the users unlocked skin aspects
    hat_names: string[] = ["default_ppc.png","la_creatura.png","love_letter.png","nyan_poptart.png","pollo.png","hypnotic_blue.gif","purple_toxic.png","sans.png"]; // File names of the users unlocked skin aspects
    playerSkins : any[]=[]; // Actual images of the users unlocked skin aspects
    playerHats : any[]=[]; // Actual images of the users unlocked aspects
    fadeInTime = 500; // Fade-in duration in milliseconds
    strokeWidth=5;

    selector: string="skin";
    done :boolean = false;
    dripMsg:string="";

    preload = (p5:p5) => {
      this.skin_names=this.props.gachaObjects;
      for (let i = 0; i < this.skin_names.length; i++) {this.playerSkins.push(p5.loadImage(`/sprites/playerSkins/${this.skin_names[i]}`));}
      for (let i = 0; i < this.hat_names.length; i++) {this.playerHats.push(p5.loadImage(`/sprites/playerSkins/${this.hat_names[i]}`));}
    };

    windowResized = (p5:p5) =>  {
        p5.resizeCanvas(p5.windowWidth,p5.windowHeight);  //Resize the canvas
    };

    setup = (p5:p5, canvasParentRef:Element) => {
      const marginPercentage = 0.15;
      const canvasWidth = p5.windowWidth * (1 - 2 * marginPercentage);
      const canvasHeight = p5.windowHeight * (1 - 2 * marginPercentage);
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

      // Set the starting index
      this.currentSkinIndex = this.skin_names.indexOf(this.props.userSkin);
      this.currentHatIndex = 0;
  
      this.currentHat = this.playerHats[this.currentHatIndex];
      this.currentSkin = this.playerSkins[this.currentSkinIndex];
    };

    
    rarityColor(rarity:string){
        switch(rarity){
          case("common"):
            return "green";
          case("rare"):
            return "blue";
          case("epic"):
            return "purple";
          case("legendary"):
            return "gold";
        }
    };

    randomDripMessage(){
      switch(Math.floor(Math.random() * 10) ){
        case(0):
          return "q pro";
        case(1):
          return "pues normalito";
        case(2):
          return "Vaya drip!";
        case(3):
          return "Re facha!";
        case(4):
          return "Quedó meh.";
        case(5):
          return "Bien!";
        case(6):
          return "amogus";
        case(7):
          return "Vaya drip!";
        case(8):
          return "Bastante fresco";
        case(9):
          return "Bastante fresco";
        default:
          return "ඞ"
      }
  };

    draw = (p5: p5) => {
      p5.background(this.bgShadeOfGray,125);
    
      // Calculate the positions of the three squares
      const middleSquareSize = 120;
      const outerSquareSize = 100;
      const spacing = 50;
      const x = p5.width / 2 - (3*middleSquareSize);
      const ySkins = p5.height / 2;
      const yHats = p5.height / 2 - middleSquareSize - spacing;

      // Display the hat selection squares
      for (let i = -1; i <= 1; i++) {
        const index = this.currentHatIndex + i;
    
        // Wrap around the array if necessary
        const wrappedIndex = (index + this.playerHats.length) % this.playerHats.length;
    
        // Get the image at the current index
        const hat = this.playerHats[wrappedIndex];
    
        // Calculate the size of the current square
        const size = i === 0 ? middleSquareSize : outerSquareSize;
    
        // Calculate the position of the current square

        let xPos;
        if(i===-1){
            xPos = x;
        }else if (i===0){
            xPos = x + outerSquareSize + spacing;
        }else{
            xPos = x + + outerSquareSize + spacing + middleSquareSize + spacing;
        }
        const yPos = yHats;

        // Calculate the fade-in opacity based on the time since the last key press
        const elapsedTime = p5.millis() - this.lastKeyPressTimeHat;
        const opacity = p5.map(elapsedTime, 0, this.fadeInTime, 0, 255);
        const opacityOut = p5.map(elapsedTime, 0, this.fadeInTime, 255, 125);
        const outerOpacity = i != 0 ? opacityOut : 0 ; // Set full opacity for the middle square
        const strokeWeight = i === 0 ? this.strokeWidth : 1; // Set thicker stroke for the middle square
        const strokeColor = (i === 0 && this.selector=="hat") ? p5.color(255, 0, 0) : p5.color(0,0); // Set red stroke color for the middle square

        // Set stroke properties
        p5.push();
          p5.strokeWeight(strokeWeight);
          p5.stroke(strokeColor);
          p5.image(hat, xPos, yPos, size, size);
          p5.fill(this.bgShadeOfGray,outerOpacity);
          p5.rect(xPos, yPos, size, size);
        p5.pop();

        if (i === 0) {
          // Display the number inside the middle square
          p5.push();
            p5.noTint();
            p5.fill(0);
            p5.textSize(32);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(this.hat_names[this.currentHatIndex], xPos + size / 2, yPos - spacing / 2);
          p5.pop();
        }else {
            // Draw arrow indicators for the outer squares
            const arrowSize = 40;
            const arrowX = xPos + size / 2;
            const arrowY = yPos + size + spacing / 2;
      
            // Determine the arrow color based on the key press
            let arrowColor = p5.color(0); // Default color
            if ((i === -1 && p5.keyCode === p5.LEFT_ARROW) || (i === 1 && p5.keyCode === p5.RIGHT_ARROW)) {
              if(opacity<255){arrowColor = p5.color(255, 0, 0,opacityOut);} // Red color for left or right arrow press 
            }

            // Draw the arrow triangle
            p5.push();
            p5.fill(arrowColor);
            p5.noStroke();

            // Left arrow indicator
            if (i === -1) {
              p5.triangle(arrowX - arrowSize / 2, arrowY, arrowX + arrowSize / 2, arrowY - arrowSize / 2, arrowX + arrowSize / 2, arrowY + arrowSize / 2);
            }
            // Right arrow indicator
            else if (i === 1) {
              p5.triangle(arrowX + arrowSize / 2, arrowY, arrowX - arrowSize / 2, arrowY - arrowSize / 2, arrowX - arrowSize / 2, arrowY + arrowSize / 2);
            }
      
            p5.pop();
          }
      }

      // Display the skin selection squares
      for (let i = -1; i <= 1; i++) {
        const index = this.currentSkinIndex + i;
    
        // Wrap around the array if necessary
        const wrappedIndex = (index + this.playerSkins.length) % this.playerSkins.length;
    
        // Get the image at the current index
        const skin = this.playerSkins[wrappedIndex];
    
        // Calculate the size of the current square
        const size = i === 0 ? middleSquareSize : outerSquareSize;
    
        // Calculate the position of the current square

        let xPos;
        if(i===-1){
            xPos = x;
        }else if (i===0){
            xPos = x + outerSquareSize + spacing;
        }else{
            xPos = x + + outerSquareSize + spacing + middleSquareSize + spacing;
        }
        const yPos = ySkins;

        // Calculate the fade-in opacity based on the time since the last key press
        const elapsedTime = p5.millis() - this.lastKeyPressTimeSkin;
        const opacity = p5.map(elapsedTime, 0, this.fadeInTime, 0, 255);
        const opacityOut = p5.map(elapsedTime, 0, this.fadeInTime, 255, 125);
        const outerOpacity = i != 0 ? opacityOut : 0 ; // Set full opacity for the middle square
        const strokeWeight = i === 0 ? this.strokeWidth : 1; // Set thicker stroke for the middle square
        const strokeColor =(i === 0 && this.selector=="skin") ? p5.color(255, 0, 0) : p5.color(0,0); // Set red stroke color for the middle square

        
        // Set stroke properties
        p5.push();
          p5.strokeWeight(strokeWeight);
          p5.stroke(strokeColor);
          p5.image(skin, xPos, yPos, size, size);
          p5.fill(this.bgShadeOfGray,outerOpacity);
          p5.rect(xPos, yPos, size, size);
        p5.pop();

        if (i === 0) {
          // Display the number inside the middle square
          p5.push();
            p5.noTint();
            p5.fill(0);
            p5.textSize(32);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(this.skin_names[this.currentSkinIndex], xPos + size / 2, yPos + outerSquareSize + spacing);
          p5.pop();
        }else {
            // Draw arrow indicators for the outer squares
            const arrowSize = 40;
            const arrowX = xPos + size / 2;
            const arrowY = yPos + size + spacing / 2;
      
            // Determine the arrow color based on the key press
            let arrowColor = p5.color(0); // Default color
            if ((i === -1 && p5.keyCode === p5.LEFT_ARROW) || (i === 1 && p5.keyCode === p5.RIGHT_ARROW)) {
              if(opacity<255){arrowColor = p5.color(255, 0, 0,opacityOut);} // Red color for left or right arrow press 
            }
      
            // Draw the arrow triangle
            p5.push();
            p5.fill(arrowColor);
            p5.noStroke();
      
            // Left arrow indicator
            if (i === -1) {
              p5.triangle(arrowX - arrowSize / 2, arrowY, arrowX + arrowSize / 2, arrowY - arrowSize / 2, arrowX + arrowSize / 2, arrowY + arrowSize / 2);
            }
            // Right arrow indicator
            else if (i === 1) {
              p5.triangle(arrowX + arrowSize / 2, arrowY, arrowX - arrowSize / 2, arrowY - arrowSize / 2, arrowX - arrowSize / 2, arrowY + arrowSize / 2);
            }
      
            p5.pop();
          }
      }

      p5.image(this.currentSkin, p5.width / 2 + 2*middleSquareSize, ySkins-spacing/2, middleSquareSize, middleSquareSize);
      p5.image(this.currentHat,  p5.width / 2 + 2*middleSquareSize, yHats+spacing/2, middleSquareSize, middleSquareSize);

      if(this.done){
        p5.push();
          p5.noTint();
          p5.fill(0);
          p5.textSize(32);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.text(this.dripMsg, p5.width / 2 + 2*middleSquareSize + middleSquareSize/2, ySkins-spacing/2 + middleSquareSize + spacing);
        p5.pop();
      }

    };

    keyPressed = (p5:p5) => {

    if (p5.keyCode === p5.UP_ARROW) {
        this.selector="hat"
    } 

    if (p5.keyCode === p5.DOWN_ARROW) {
      this.selector="skin"
    } 

      if (p5.keyCode === p5.LEFT_ARROW) {
        if(this.selector=="hat"){
            this.currentHatIndex = (this.currentHatIndex - 1 + this.playerHats.length) % this.playerHats.length;
            this.lastKeyPressTimeHat = p5.millis();
        }else if(this.selector=="skin"){
            this.currentSkinIndex = (this.currentSkinIndex - 1 + this.playerSkins.length) % this.playerSkins.length;
            this.lastKeyPressTimeSkin = p5.millis();
        }
      } 
      if (p5.keyCode === p5.RIGHT_ARROW) {
        if(this.selector=="hat"){
            this.currentHatIndex = (this.currentHatIndex + 1 + this.playerHats.length) % this.playerHats.length;
            this.lastKeyPressTimeHat = p5.millis();
        }else if(this.selector=="skin"){
            this.currentSkinIndex = (this.currentSkinIndex + 1 + this.playerSkins.length) % this.playerSkins.length;
            this.lastKeyPressTimeSkin = p5.millis();
        }
      }
      if(p5.keyCode == 13) { // enter key
        const CustomizeUser = () => {
          fetch("/api/CustomizationReq", {
            method: "PUT",
            body: JSON.stringify({
              "skin":this.skin_names[this.currentSkinIndex],
              "hat":this.hat_names[this.currentHatIndex],
            }),
            headers: {
              "content-type": "application/json",
            },
          }).catch((e) => console.log(e));
        };
        CustomizeUser();
        this.dripMsg=this.randomDripMessage();
        this.done=true;
        this.currentSkin= this.playerSkins[this.currentSkinIndex];
        this.currentHat= this.playerHats[this.currentHatIndex];
        // Call location.reload() after the delay
        setTimeout(() => {location.reload();}, 500);
      }
    }

    render() {
        return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Sketch 
                  preload={this.preload}
                  keyPressed={this.keyPressed}
                  setup={this.setup}
                  draw={this.draw}
                />
              </div>
            </div>
        );
    };

}

