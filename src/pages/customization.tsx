// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
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

export async function getServerSideProps() {
  let DB: DBO | null = null; // Initialize DB variable with null

  let isConnected = false;
  let userSkin = 0;
  let gachaObjects = [];

  try {
    // Database object
    DB = new DBO();
    // User data object
    const UDO = new UserModel(DB.db);
    let userData = await UDO.getUser("bingus");

    if (userData) {
      userSkin = userData.CurrentAspect;
      gachaObjects = userData.GachaObjects;
      isConnected = true;
    } else {
      console.log("ERROR FETCHING USER DATA");
    }

    return {
      props: { isConnected, userSkin, gachaObjects },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected },
    };
  } finally {
    if (DB) {
      DB.end();
    }
  }
}

export default class App extends Component<Clients> {

  bgShadeOfGray: number = 200;

  currentHat: any;
  currentSkin: any;
  currentSkinIndex: number = 0; // Current index in the skin array
  currentHatIndex: number = 0; // Current index in the hat array

  skin_names: string[] = ["default_ppc.png"]; // File names of the users unlocked skin aspects
  hat_names: string[] = ["default_ppc.png"]; // File names of the users unlocked hat aspects
  playerSkins: any[] = []; // Actual images of the users unlocked skin aspects
  playerHats: any[] = []; // Actual images of the users unlocked aspects

  commonSkin_names: string[] = ["default_ppc.png"
    , "love_letter.png"
    , "mistery.png"
    , "red_mushroom.png"
    , "orchid.png"
    , "pollo.png"
    , "tetris.png"
    , "third_love.png"];
  rareSkin_names: string[] = ["hamburguer.png"
    , "monster_ball.png"
    , "pizza.png"
    , "purple_toxic.png"
    , "rex.png"
    , "sushi.png"
    , "watermelon.png"];
  epicSkin_names: string[] = ["creeper.png"
    , "invaders.gif"
    , "japan_night.png"
    , "nyan_poptart.png"
    , "retrowave.png"
    , "sans.png"
    , "waka_ghost.gif"];
  legendarySkin_names: string[] = ["hello_world.gif"
    , "hypnotic_blue.gif"
    , "rainbow.gif"
    , "waka_waka.gif"];

  lastKeyPressTimeHat: number = 0;
  lastKeyPressTimeSkin: number = 0;
  fadeInTime = 500; // Fade-in duration in milliseconds
  strokeWidth = 5;

  middleSquareSize: number = 0;
  outerSquareSize: number = 0;
  spacing: number = 0;
  xOffset: number = 0;
  ySkins: number = 0;
  yHats: number = 0;
  arrowSize: number = 0;

  previewedPartX: number = 0;
  previewedSkinY: number = 0;
  previewedHatY: number = 0;

  selector: string = "skin";
  confirm: boolean = false;
  done: boolean = false;
  dripMsg: string = "";

  preload = (p5: any) => {
    this.skin_names = this.props.gachaObjects[0];
    this.hat_names = this.props.gachaObjects[1];
    for (let i = 0; i < this.skin_names.length; i++) { this.playerSkins.push(p5.loadImage(`/sprites/allSkins/${this.skin_names[i]}`)); }
    for (let i = 0; i < this.hat_names.length; i++) { this.playerHats.push(p5.loadImage(`/sprites/allSkins/${this.hat_names[i]}`)); }
  };

  windowResized = (p5: any) => {
    //Window Size
    const marginPercentage = 0.15;
    const canvasWidth = p5.windowWidth * (1 - 2 * marginPercentage);
    const canvasHeight = p5.windowHeight * (1 - 2 * marginPercentage);
    p5.resizeCanvas(canvasWidth, canvasHeight);

    // Calculate the positions of the three squares
    this.middleSquareSize = 0.13 * canvasWidth;
    this.outerSquareSize = this.middleSquareSize * 0.5;
    this.spacing = 0.3 * this.middleSquareSize;
    this.xOffset = 0.2 * canvasWidth;
    this.yHats = canvasHeight / 2 - this.middleSquareSize * 0.8;
    this.ySkins = canvasHeight / 2 + this.middleSquareSize * 0.8;

    this.arrowSize = 40;

    this.previewedPartX = 0.7 * canvasWidth;
    this.previewedHatY = canvasHeight / 2 - this.middleSquareSize / 2;
    this.previewedSkinY = canvasHeight / 2 + this.middleSquareSize / 2;

  };

  setup = (p5: any, canvasParentRef: Element) => {

    //Initial setup
    p5.createCanvas(0, 0).parent(canvasParentRef);
    //Window Size
    const marginPercentage = 0.15;
    const canvasWidth = p5.windowWidth * (1 - 2 * marginPercentage);
    const canvasHeight = p5.windowHeight * (1 - 2 * marginPercentage);
    p5.resizeCanvas(canvasWidth, canvasHeight);

    // Calculate the positions of the three squares
    this.middleSquareSize = 0.13 * canvasWidth;
    this.outerSquareSize = this.middleSquareSize * 0.5;
    this.spacing = 0.3 * this.middleSquareSize;
    this.xOffset = 0.2 * canvasWidth;
    this.yHats = canvasHeight / 2 - this.middleSquareSize * 0.8;
    this.ySkins = canvasHeight / 2 + this.middleSquareSize * 0.8;

    this.arrowSize = 40;

    this.previewedPartX = 0.7 * canvasWidth;
    this.previewedHatY = canvasHeight / 2 - this.middleSquareSize / 2;
    this.previewedSkinY = canvasHeight / 2 + this.middleSquareSize / 2;

    // Set the starting index
    this.currentSkinIndex = this.skin_names.indexOf(this.props.userSkin[0]);
    this.currentHatIndex = this.hat_names.indexOf(this.props.userSkin[1]);

    this.currentHat = this.playerHats[this.currentHatIndex];
    this.currentSkin = this.playerSkins[this.currentSkinIndex];
  };

  rarityColor(rarity: string) {
    switch (rarity) {
      case ("common"):
        return "green";
      case ("rare"):
        return "blue";
      case ("epic"):
        return "purple";
      case ("legendary"):
        return "gold";
      default:
        return "red";
    }
  };

  randomDripMessage() {
    switch (Math.floor(Math.random() * 10)) {
      case (0):
        return "q pro";
      case (1):
        return "pues normalito";
      case (2):
        return "Vaya drip!";
      case (3):
        return "Re facha!";
      case (4):
        return "Quedó meh\n(sin ofender xd)";
      case (5):
        return "Bien!";
      case (6):
        return "amogus";
      case (7):
        return "Vaya drip!";
      case (8):
        return "Bastante fresco";
      case (9):
        return "ඞ";
      default:
        return "ඞ"
    }
  };

  mouseInsideSquare(p5: any, x: number, y: number, size: number) {
    return (p5.mouseX > x - size / 2 &&
      p5.mouseX < x + size / 2 &&
      p5.mouseY > y - size / 2 &&
      p5.mouseY < y + size / 2);
  }

  draw = (p5: any) => {
    p5.background(this.bgShadeOfGray, 125);

    // Display the hat selection squares
    for (let i = -1; i <= 1; i++) {
      const index = this.currentHatIndex + i;

      // Wrap around the array if necessary
      const wrappedIndex = (index + this.playerHats.length) % this.playerHats.length;

      // Get the image at the current index
      const hat = this.playerHats[wrappedIndex];
      const hatName = this.hat_names[wrappedIndex];
      let rarity: string;

      if (this.commonSkin_names.includes(hatName)) {
        rarity = "common";
      } else if (this.rareSkin_names.includes(hatName)) {
        rarity = "rare";
      } else if (this.epicSkin_names.includes(hatName)) {
        rarity = "epic";
      } else if (this.legendarySkin_names.includes(hatName)) {
        rarity = "legendary";
      } else {
        rarity = "none"; // The skin name doesn't exist in any of the arrays
      }

      // Calculate the size of the current square
      const size = i === 0 ? this.middleSquareSize : this.outerSquareSize;

      // Calculate the position of the current square
      const xPos = this.xOffset + (i + 1) * this.middleSquareSize;
      const yPos = this.yHats;

      // Calculate the fade-in opacity based on the time since the last key press
      const elapsedTime = p5.millis() - this.lastKeyPressTimeHat;
      const opacity = p5.map(elapsedTime, 0, this.fadeInTime, 0, 255);
      const opacityOut = p5.map(elapsedTime, 0, this.fadeInTime, 255, 125);
      const outerOpacity = i != 0 ? opacityOut : 0; // Set full opacity for the middle square
      const strokeWeight = i === 0 ? this.strokeWidth : 1; // Set thicker stroke for the middle square
      const strokeColor = (i === 0 && this.selector == "hat") ? this.rarityColor(rarity) : p5.color(0, 0); // Set red stroke color for the middle square

      // Set stroke properties
      p5.push();
      p5.strokeWeight(strokeWeight);
      p5.stroke(strokeColor);
      p5.imageMode(p5.CENTER);
      p5.image(hat, xPos, yPos, size, size);
      p5.fill(this.bgShadeOfGray, outerOpacity);
      p5.rectMode(p5.CENTER);
      p5.rect(xPos, yPos, size, size);
      p5.pop();

      if (i === 0) {
        // Display the hat name inside the middle square
        if (this.mouseInsideSquare(p5, xPos, yPos, size)) {
          // Check for mouse click inside the square
          if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            // Handle the click event
            this.selector = "hat";
          }
        }

        p5.push();
        p5.noTint();
        p5.fill(0);
        p5.textSize(this.middleSquareSize * 0.2);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(this.hat_names[this.currentHatIndex], xPos, yPos - size / 2 - this.spacing);
        p5.pop();

      } else {
        // Draw arrow indicators for the outer squares
        const arrowX = xPos;
        const arrowY = yPos + size + this.spacing / 2;

        // Determine the arrow color based on the key press
        let arrowColor = p5.color(0); // Default color
        if ((i === -1 && p5.keyCode === p5.LEFT_ARROW) || (i === 1 && p5.keyCode === p5.RIGHT_ARROW)) {
          if (opacity < 255) { arrowColor = p5.color(255, 0, 0, opacityOut); } // Red color for left or right arrow press 
        }

        // Draw the arrow triangle
        p5.push();
        p5.fill(arrowColor);
        p5.noStroke();

        // Left arrow indicator
        if (i === -1) {
          p5.triangle(arrowX - this.arrowSize / 2, arrowY, arrowX + this.arrowSize / 2, arrowY - this.arrowSize / 2, arrowX + this.arrowSize / 2, arrowY + this.arrowSize / 2);
        }
        // Right arrow indicator
        else if (i === 1) {
          p5.triangle(arrowX + this.arrowSize / 2, arrowY, arrowX - this.arrowSize / 2, arrowY - this.arrowSize / 2, arrowX - this.arrowSize / 2, arrowY + this.arrowSize / 2);
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
      const skinName = this.skin_names[wrappedIndex];
      let rarity: string;

      if (this.commonSkin_names.includes(skinName)) {
        rarity = "common";
      } else if (this.rareSkin_names.includes(skinName)) {
        rarity = "rare";
      } else if (this.epicSkin_names.includes(skinName)) {
        rarity = "epic";
      } else if (this.legendarySkin_names.includes(skinName)) {
        rarity = "legendary";
      } else {
        rarity = "none"; // The skin name doesn't exist in any of the arrays
      }

      // Calculate the size of the current square
      const size = i === 0 ? this.middleSquareSize : this.outerSquareSize;

      // Calculate the position of the current square
      const xPos = this.xOffset + (i + 1) * this.middleSquareSize;
      const yPos = this.ySkins;

      // Calculate the fade-in opacity based on the time since the last key press
      const elapsedTime = p5.millis() - this.lastKeyPressTimeSkin;
      const opacity = p5.map(elapsedTime, 0, this.fadeInTime, 0, 255);
      const opacityOut = p5.map(elapsedTime, 0, this.fadeInTime, 255, 125);
      const outerOpacity = i != 0 ? opacityOut : 0; // Set full opacity for the middle square
      const strokeWeight = i === 0 ? this.strokeWidth : 1; // Set thicker stroke for the middle square
      const strokeColor = (i === 0 && this.selector == "skin") ? this.rarityColor(rarity) : p5.color(0, 0); // Set red stroke color for the middle square

      // Set stroke properties
      p5.push();
      p5.strokeWeight(strokeWeight);
      p5.stroke(strokeColor);
      p5.imageMode(p5.CENTER);
      p5.image(skin, xPos, yPos, size, size);
      p5.fill(this.bgShadeOfGray, outerOpacity);
      p5.rectMode(p5.CENTER);
      p5.rect(xPos, yPos, size, size);
      p5.pop();

      if (i === 0) {
        // Display the hat name inside the middle square
        if (this.mouseInsideSquare(p5, xPos, yPos, size)) {
          // Check for mouse click inside the square
          if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            // Handle the click event
            this.selector = "skin";
          }
        }
        p5.push();
        p5.noTint();
        p5.fill(0);
        p5.textSize(this.middleSquareSize * 0.2);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(this.skin_names[this.currentSkinIndex], xPos, yPos + size / 2 + this.spacing);
        p5.pop();

      } else {

        // Draw arrow indicators for the outer squares
        const arrowX = xPos;
        const arrowY = yPos + size + this.spacing / 2;

        // Determine the arrow color based on the key press
        let arrowColor = p5.color(0); // Default color
        if ((i === -1 && p5.keyCode === p5.LEFT_ARROW) || (i === 1 && p5.keyCode === p5.RIGHT_ARROW)) {
          if (opacity < 255) { arrowColor = p5.color(255, 0, 0, opacityOut); } // Red color for left or right arrow press 
        }

        // Draw the arrow triangle
        p5.push();
        p5.fill(arrowColor);
        p5.noStroke();

        // Left arrow indicator
        if (i === -1) {
          p5.triangle(arrowX - this.arrowSize / 2, arrowY, arrowX + this.arrowSize / 2, arrowY - this.arrowSize / 2, arrowX + this.arrowSize / 2, arrowY + this.arrowSize / 2);
        }
        // Right arrow indicator
        else if (i === 1) {
          p5.triangle(arrowX + this.arrowSize / 2, arrowY, arrowX - this.arrowSize / 2, arrowY - this.arrowSize / 2, arrowX - this.arrowSize / 2, arrowY + this.arrowSize / 2);
        }

        p5.pop();
      }
    }

    p5.push();
    p5.imageMode(p5.CENTER);
    p5.image(this.currentHat, this.previewedPartX, this.previewedHatY, this.middleSquareSize, this.middleSquareSize);
    p5.image(this.currentSkin, this.previewedPartX, this.previewedSkinY, this.middleSquareSize, this.middleSquareSize);
    p5.pop();

    p5.push();
    p5.noTint();
    p5.fill(0);
    p5.textSize(this.middleSquareSize * 0.2);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text("Vista previa", this.previewedPartX, this.previewedHatY - this.middleSquareSize / 2 - this.spacing);
    p5.text(this.dripMsg, this.previewedPartX, this.previewedSkinY + this.middleSquareSize / 2 + this.spacing);
    p5.pop();

  };

  keyPressed = (p5: any) => {

    if (!this.done) {
      if (!this.confirm) {
        if (p5.keyCode === p5.UP_ARROW) {

          this.selector = "hat"
        }

        if (p5.keyCode === p5.DOWN_ARROW) {
          this.selector = "skin"
        }

        if (p5.keyCode === p5.LEFT_ARROW) {
          if (this.selector == "hat") {
            this.currentHatIndex = (this.currentHatIndex - 1 + this.playerHats.length) % this.playerHats.length;
            this.lastKeyPressTimeHat = p5.millis();
          } else if (this.selector == "skin") {
            this.currentSkinIndex = (this.currentSkinIndex - 1 + this.playerSkins.length) % this.playerSkins.length;
            this.lastKeyPressTimeSkin = p5.millis();
          }
        }

        if (p5.keyCode === p5.RIGHT_ARROW) {
          if (this.selector == "hat") {
            this.currentHatIndex = (this.currentHatIndex + 1 + this.playerHats.length) % this.playerHats.length;
            this.lastKeyPressTimeHat = p5.millis();
          } else if (this.selector == "skin") {
            this.currentSkinIndex = (this.currentSkinIndex + 1 + this.playerSkins.length) % this.playerSkins.length;
            this.lastKeyPressTimeSkin = p5.millis();
          }
        }

      }

      if (p5.keyCode == 27) { // esc key
        if (this.confirm) {
          this.dripMsg = "";
          this.confirm = false;
          // Set the starting index
          this.currentSkinIndex = this.skin_names.indexOf(this.props.userSkin[0]);
          this.currentHatIndex = this.hat_names.indexOf(this.props.userSkin[1]);

          this.currentHat = this.playerHats[this.currentHatIndex];
          this.currentSkin = this.playerSkins[this.currentSkinIndex];
        }

      }

      if (p5.keyCode == 13) { // enter key
        if (!this.confirm) {
          this.currentSkin = this.playerSkins[this.currentSkinIndex];
          this.currentHat = this.playerHats[this.currentHatIndex];
          this.dripMsg = "Enter para confirmar\n Esc para volver";
          this.confirm = true;
        } else {
          const CustomizeUser = () => {
            fetch("/api/CustomizationReq", {
              method: "PUT",
              body: JSON.stringify({
                "skin": this.skin_names[this.currentSkinIndex],
                "hat": this.hat_names[this.currentHatIndex],
              }),
              headers: {
                "content-type": "application/json",
              },
            }).catch((e) => console.log(e));
          };
          CustomizeUser();
          this.dripMsg = this.randomDripMessage();
          // Call location.reload() after the delay
          setTimeout(() => { location.reload(); }, 1000);
          this.done = true;
        }
      }

    }
  }

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
          />
        </div>
      </div>
    );
  };

}

