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

export default class App extends Component<Clients> {

  bgShadeOfGray: number = 200; //Background color

  //Preload
  skin_names: string[] = ["default_ppc.png", "la_creatura.png", "love_letter.png", "nyan_poptart.png", "pollo.png", "hypnotic_blue.gif", "purple_toxic.png", "sans.png"];
  hat_names: string[] = ["default_ppc.png", "la_creatura.png", "love_letter.png", "nyan_poptart.png", "pollo.png", "hypnotic_blue.gif", "purple_toxic.png", "sans.png"];

  //Graphical assets
  skinImages: p5.Image[] = []; //Loaded images of the skins
  hatImages: p5.Image[] = []; //Loaded images of the hats
  leftArray: any[] = []; //Images of the skins in the left scrolling bar
  rightArray: any[] = []; //Images of the hats in the right scrolling bar
  unknown: any; //Question mark sprite
  gachaMachine: any; //Gacha machine sprite
  gachaGIF: any; //Gacha machine GIF

  //User Interaction
  hasInteracted = false;

  //Logic control
  scrollLeft: number = 0; //Scroll offset of the bars
  scrollRight: number = 0; //Scroll offset of the bars

  //Position and sizing of things (initial size, later changes in setup according to window size)
  squareSize: number = 0;
  spacing: number = 0;
  startY: number = 0;
  imageSize: number = 0;
  previewSquareSize: number = 0;
  imgX: number = 0;
  imgY: number = 0;
  selSquareAX: number = 0;
  selSquareAY: number = 0;
  selSquareBX: number = 0;
  selSquareBY: number = 0;
  prevSquareSkinX: number = 0;
  prevSquareSkinY: number = 0;
  prevSquareHatX: number = 0;
  prevSquareHatY: number = 0;
  previewedSkin: any;
  previewedHat: any;

  preload = (p5: any) => {
    // Load graphical assets
    this.gachaMachine = p5.loadImage('/sprites/generalAssets/gachaMachine.png');
    this.gachaGIF = p5.loadImage('/sprites/generalAssets/gachaGIF.gif');
    this.unknown = p5.loadImage('/sprites/generalAssets/unknown.png');
    for (let i = 0; i < this.skin_names.length; i++) { this.skinImages.push(p5.loadImage(`/sprites/playerSkins/${this.skin_names[i]}`)); }
    for (let i = 0; i < this.hat_names.length; i++) { this.hatImages.push(p5.loadImage(`/sprites/playerSkins/${this.hat_names[i]}`)); }
  };

  windowResized = (p5: any) => {
    //Window Size
    const marginPercentage = 0.15;
    const canvasWidth = p5.windowWidth * (1 - 2 * marginPercentage);
    const canvasHeight = p5.windowHeight * (1 - 2 * marginPercentage);
    p5.resizeCanvas(canvasWidth, canvasHeight);

    //Position and sizing of things
    this.squareSize = 0.05 * p5.width;
    this.spacing = 0.3 * this.squareSize;
    this.startY = this.squareSize / 2 + this.spacing;
    this.imageSize = this.squareSize * 4;
    this.previewSquareSize = this.imageSize*0.8;
    this.imgX = p5.width / 2;
    this.imgY = p5.height / 2 - this.squareSize * 0.8;
    this.selSquareAX = this.imgX - this.squareSize;
    this.selSquareAY = this.imgY + this.imageSize * 0.7;
    this.selSquareBX = this.imgX + this.squareSize;
    this.selSquareBY = this.imgY + this.imageSize * 0.7;
    this.prevSquareSkinX = p5.width * 0.25;
    this.prevSquareSkinY = this.imgY;
    this.prevSquareHatX = p5.width * 0.75;
    this.prevSquareHatY = this.imgY;
  };

  setup = (p5: any, canvasParentRef: Element) => {

    //Initial setup
    p5.createCanvas(0, 0).parent(canvasParentRef);
    this.windowResized(p5);

    //Initial loading of the assets in default status
    if (this.skinImages.length < 9) {
      let i = 0;
      while (this.leftArray.length < 9) {
        this.leftArray.push(this.skinImages[i]);
        i++;
        i %= this.skinImages.length;
      }
    } else {
      this.leftArray = this.skinImages;
    }
    if (this.hatImages.length < 9) {
      let i = 0;
      while (this.rightArray.length < 9) {
        this.rightArray.push(this.hatImages[i]);
        i++;
        i %= this.hatImages.length;
      }
    } else {
      this.rightArray = this.hatImages;
    }
    this.previewedSkin = this.unknown;
    this.previewedHat = this.unknown;

  };

  mouseInsideSquare(p5: p5, x: number, y: number, size: number) {
    return(p5.mouseX > x - size / 2 &&
      p5.mouseX < x + size / 2 &&
      p5.mouseY > y - size / 2 &&
      p5.mouseY < y + size / 2);
  }

  draw = (p5: any) => {
    p5.background(this.bgShadeOfGray, 125);

    // Iterate over the leftArray and display its values
    for (let i = 0; i < this.leftArray.length; i++) {

      const x = this.squareSize / 2 + this.spacing;
      const y = this.startY + (-this.squareSize - this.spacing) + i * (this.squareSize + this.spacing) + this.scrollLeft; // Adjust the y-position as needed

      // Draw the square
      p5.push();
      p5.noFill();
      if (this.mouseInsideSquare(p5, x, y, this.squareSize)) {
        p5.stroke("red"); // Yellow stroke
        p5.strokeWeight(3); // Increase stroke weight

        // Check for mouse click inside the square
        if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
          // Handle the click event
          this.previewedSkin = this.leftArray[i];
        }
      } else {
        p5.noStroke();
      }
      p5.rectMode(p5.CENTER);
      p5.rect(x, y, this.squareSize, this.squareSize);
      p5.pop();

      // Display the image inside the square
      p5.image(this.leftArray[i], x, y, this.squareSize, this.squareSize);
    }

    // Iterate over the rightArray and display its values
    for (let i = 0; i < this.rightArray.length; i++) {

      const x = p5.width - this.squareSize;
      const y = this.startY + i * (this.squareSize + this.spacing) + this.scrollRight; // Adjust the y-position as needed

      // Draw the square
      p5.push();
      p5.noFill();
      if (this.mouseInsideSquare(p5, x, y, this.squareSize)) {
        p5.stroke("red"); // Yellow stroke
        p5.strokeWeight(3); // Increase stroke weight
        // Check for mouse click inside the square
        if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
          // Handle the click event
          this.previewedHat = this.rightArray[i];
        }
      } else {
        p5.noStroke();
      }
      p5.rectMode(p5.CENTER);
      p5.rect(x, y, this.squareSize, this.squareSize);
      p5.pop();

      // Display the image inside the square
      p5.image(this.rightArray[i], x, y, this.squareSize, this.squareSize);
    }

    this.scrollLeft += 1;
    this.scrollRight -= 1;

    if (this.scrollLeft > this.squareSize + this.spacing) {
      this.leftArray.unshift(this.leftArray.pop());
      this.scrollLeft = 0;
    }

    if (Math.abs(this.scrollRight) > this.squareSize + this.spacing) {
      this.rightArray.push(this.rightArray.shift());
      this.scrollRight = 0;
    }

    // Display the image in the middle of the screen if hasInteracted is false
    if (!this.hasInteracted && this.gachaMachine) {
      p5.imageMode(p5.CENTER);
      p5.image(this.gachaMachine, this.imgX, this.imgY, this.imageSize, this.imageSize);
    }

    // Display the GIF in the middle of the screen if hasInteracted is true
    if (this.hasInteracted && this.gachaGIF) {
      p5.imageMode(p5.CENTER);
      p5.image(this.gachaGIF, this.imgX, this.imgY, this.imageSize * 1.19, this.imageSize * 1.19);
    }

    // Draw square 
    p5.push();
    p5.rectMode(p5.CENTER);

    // Highlight square when the mouse hovers over it
    if (this.mouseInsideSquare(p5, this.selSquareAX, this.selSquareAY, this.squareSize)) {
      p5.fill("gold");
      p5.stroke("gold"); // Yellow stroke
      p5.strokeWeight(3); // Increase stroke weight
    } else {
      p5.fill("white");
      p5.noStroke();
    }
    p5.rect(this.selSquareAX, this.selSquareAY, this.squareSize, this.squareSize);
    p5.pop();

    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(this.squareSize * 0.4);
    p5.text('★', this.selSquareAX, this.selSquareAY);

    // Draw square
    p5.push();
    p5.rectMode(p5.CENTER);

    // Highlight square when the mouse hovers over it
    if (this.mouseInsideSquare(p5, this.selSquareBX, this.selSquareBY, this.squareSize)) {
      p5.fill("purple");
      p5.stroke("purple"); // Yellow stroke
      p5.strokeWeight(3); // Increase stroke weight
    } else {
      p5.fill("white");
      p5.noStroke();
    }

    p5.rect(this.selSquareBX, this.selSquareBY, this.squareSize, this.squareSize);
    p5.pop();
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(this.squareSize * 0.4);
    p5.text('x1', this.selSquareBX, this.selSquareBY);

    p5.push();
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(this.squareSize * 0.5);

    p5.image(this.previewedSkin, this.prevSquareSkinX, this.prevSquareSkinY, this.previewSquareSize, this.previewSquareSize);
    if (this.previewedSkin != this.unknown) {
      p5.text(this.skin_names[this.skinImages.indexOf(this.previewedSkin)], this.prevSquareSkinX, this.selSquareAY);
    } else {
      p5.text("< Haz click", this.prevSquareSkinX, this.selSquareAY);
    }

    p5.image(this.previewedHat, this.prevSquareHatX, this.prevSquareHatY, this.previewSquareSize, this.previewSquareSize);
    if (this.previewedHat != this.unknown) {
      p5.text(this.hat_names[this.hatImages.indexOf(this.previewedHat)], this.prevSquareHatX, this.selSquareAY);
    } else {
      p5.text("Haz click >", this.prevSquareHatX, this.selSquareAY);
    }

    p5.pop();

  };

  keyPressed = (p5: any) => {
  };

  mouseClicked = (p5: any) => {
    // Check if the mouse clicked inside square A
    if (this.mouseInsideSquare(p5, this.selSquareAX, this.selSquareAY, this.squareSize)) {
      this.hasInteracted = true;
    }

    // Check if the mouse clicked inside square B
    if (this.mouseInsideSquare(p5, this.selSquareBX, this.selSquareBY, this.squareSize)) {
      this.hasInteracted = true;
    }
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

