// Framework Imports
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5 from 'p5';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/stats.module.css';
import { withRouter, NextRouter } from 'next/router';

//Class imports
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import { GetServerSideProps } from "next";
import Clients from "@/lib/models/user";
import Gacha from "@/lib/classes/Gacha";
import PPCButton from "@/components/PPCButton";

//Main sketch fuction (AKA Game)
const Sketch = dynamic(() => import("react-p5").then((mod) => {   // Sketch object
  require('p5/lib/addons/p5.sound'); // Sound library imported after react-p5 is loaded
  return mod.default // returning react-p5 default export
}), {
  ssr: false    //Disable server side rendering
});

export async function getServerSideProps(ctx: { req: any; }) {
  let DB: DBO | null = null; // Initialize DB variable with null
  
  let isConnected = false;
  let userCoins = 0;
  let userGems = 0;

  try {
    // Database object
    DB = new DBO();
    // User data object
    const UDO = new UserModel(DB.db);
    // Get logged user
    const {req} = ctx;
    const userName:string= req.headers.user;
    let userData = await UDO.getUser(userName);

    if (userData) {
      userCoins = userData.CoinAmount;
      userGems = userData.GemAmount;
      isConnected = true;
    } else {
      console.log("ERROR FETCHING USER DATA");
    }

    return {
      props: { isConnected, userCoins, userGems, userName },
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

interface gachaProps extends Clients {
  router: NextRouter;
}

class App extends Component<gachaProps> {

  constructor(props:any) {
    super(props);
    // Bind the function to the class instance
    this.showMessageScreen = this.showMessageScreen.bind(this);
  }

  showMessageScreen(js:any) {
    console.log(js);
    // Call the function of the App class
    if(this.gachaInstance){
      if (!(this.gachaInstance.scrollAmount > 0) && this.confirmation==true) {
        this.enter = true;
  
        //CODE FOR SKIN ADQUISITION
        const GetSkin = () => {
          fetch("/api/GachaAcquireReq", {
            method: "PUT",
            body: JSON.stringify({
              "object": ((this.selector == "skin") ? this.allSkin_names[this.allSkinImages.indexOf(this.gachaInstance.selectedValue)] : this.allHat_names[this.allHatImages.indexOf(this.gachaInstance.selectedValue)]),
              "type": this.selector,
              "user": this.props.userName
            }),
            headers: {
              "content-type": "application/json",
            },
          }).catch((e) => console.log(e));
        };
        GetSkin();
      }
    }

    this.currentSong.stop();
    this.buttonPress=true;
    this.playingMusic=false;
  }
  bgShadeOfGray: number = 200; //Background color

  //Preload

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
    , "waka_waka.gif"
    ,"clown.gif" 
    ,"laughing-dog.gif"
    ,"rgb.gif"
  ];

  allSkin_names: string[] = [
    ...this.commonSkin_names,
    ...this.rareSkin_names,
    ...this.epicSkin_names,
    ...this.legendarySkin_names
  ];

  commonHat_names: string[] = ["plant.png"
    , "balloon.png"
    , "cherry.png"
    , "graduation.png"
    , "none.png"
    , "pirate.png"
    , "santa.png"
    , "wizard.png"];
  rareHat_names: string[] = ["angel.png"
    , "birthday.png"
    , "crown.png"
    , "helicopter.png"
    , "leprechaun.png"
    , "magic.png"];
  epicHat_names: string[] = ["antenna.png"
    , "dunce.png"
    , "explosion.png"
    , "flemish.png"
    , "one_piece.png"
    , "sims.png"
    , "sombrero.png"];
  legendaryHat_names: string[] = ["carlos.png"
    , "ez_clap.png"
    , "hand.png"
    , "teemo.png"];

  allHat_names: string[] = [
    ...this.commonHat_names,
    ...this.rareHat_names,
    ...this.epicHat_names,
    ...this.legendaryHat_names
  ];

  //Graphical assets

  allSkinImages: any[] = [];
  allHatImages: any[] = [];

  leftArray: any[] = []; //Images of the skins in the left scrolling bar
  rightArray: any[] = []; //Images of the hats in the right scrolling bar
  unknown: any; //Question mark sprite
  gachaMachine: any; //Gacha machine sprite
  gachaGIF: any; //Gacha machine GIF

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
  confirmTextY: number = 0;

  previewedSkin: any;
  previewedHat: any;
  selector: string = "";
  gachaMode: string = "";
  keySelector: string = "";


  userCoins: number = 0;
  userGems: number = 0;
  gemPrice: number = 0;
  coinPrice: number = 0;


  enter: boolean = false;
  confirmation: boolean = false;
  error: boolean = false;

  gachaInstance: any;
  
  currentSong:any;
  playingMusic:boolean=false;
  buttonPress:boolean=false;


  //music

  menuMusic_names:string[]=["Spel2_ShopA.mp3","Spel2_ShopTurkey.mp3","Spel2_ShopB.mp3","Spel2_ShopC.mp3"];
  gachaMenuMusic:any[]=[];

  preload = (p5: any) => {
    // Load graphical assets
    this.gachaMachine = p5.loadImage('/sprites/generalAssets/gachaMachine.png');
    this.gachaGIF = p5.loadImage('/sprites/generalAssets/gachaGIF.gif');
    this.unknown = p5.loadImage('/sprites/generalAssets/unknown.png');

    for (let i = 0; i < this.allSkin_names.length; i++) { this.allSkinImages.push(p5.loadImage(`/sprites/allSkins/${this.allSkin_names[i]}`)); }
    for (let i = 0; i < this.allHat_names.length; i++) { this.allHatImages.push(p5.loadImage(`/sprites/allHats/${this.allHat_names[i]}`)); }
    for (let i = 0; i < this.menuMusic_names.length; i++) {this.gachaMenuMusic.push(p5.loadSound(`/sounds/${this.menuMusic_names[i]}`));}
  };

  windowResized = (p5: p5) => {
    if (!this.confirmation) {
      //Window Size
      const marginPercentage = 0.15;
      const canvasWidth = p5.windowWidth * (1 - 2 * marginPercentage);
      const canvasHeight = p5.windowHeight * (1 - 2 * marginPercentage);
      p5.resizeCanvas(canvasWidth, canvasHeight);

      //Position and sizing of things
      this.squareSize = 0.05 * canvasWidth;
      this.spacing = 0.3 * this.squareSize;
      this.startY = this.squareSize / 2 + this.spacing;
      this.imageSize = this.squareSize * 4;
      this.previewSquareSize = this.imageSize * 0.8;
      this.imgX = canvasWidth / 2;
      this.imgY = this.prevSquareSkinY = this.prevSquareHatY = canvasHeight * 0.35;
      this.selSquareAX = this.imgX - this.squareSize;
      this.selSquareAY = this.imgY + this.imageSize * 0.7;
      this.selSquareBX = this.imgX + this.squareSize;
      this.selSquareBY = this.imgY + this.imageSize * 0.7;
      this.prevSquareSkinX = canvasWidth * 0.25;
      this.prevSquareHatX = canvasWidth * 0.75;
      this.confirmTextY = canvasHeight * 0.8;

      p5.textSize(this.squareSize * 0.5);
    }
  };

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  setup = (p5: p5, canvasParentRef: Element) => {

    //Initial setup
    const marginPercentage = 0.15;
    const canvasWidth = p5.windowWidth * (1 - 2 * marginPercentage);
    const canvasHeight = p5.windowHeight * (1 - 2 * marginPercentage);
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.imageMode(p5.CENTER);
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);


    //Position and sizing of things
    this.squareSize = 0.05 * canvasWidth;
    this.spacing = 0.3 * this.squareSize;
    this.startY = this.squareSize / 2 + this.spacing;
    this.imageSize = this.squareSize * 4;
    this.previewSquareSize = this.imageSize * 0.8;
    this.imgX = canvasWidth / 2;
    this.imgY = this.prevSquareSkinY = this.prevSquareHatY = canvasHeight * 0.35;
    this.selSquareAX = this.imgX - this.squareSize;
    this.selSquareAY = this.imgY + this.imageSize * 0.7;
    this.selSquareBX = this.imgX + this.squareSize;
    this.selSquareBY = this.imgY + this.imageSize * 0.7;
    this.prevSquareSkinX = canvasWidth * 0.25;
    this.prevSquareHatX = canvasWidth * 0.75;
    this.confirmTextY = canvasHeight * 0.8;

    p5.textSize(this.squareSize * 0.5);

    const shuffledSkinsArray = this.allSkinImages.slice(); //copy values and not reference
    const shuffledHatsArray = this.allHatImages.slice(); //copy values and not reference
    this.shuffleArray(shuffledHatsArray);
    this.shuffleArray(shuffledHatsArray);

    // Load the randomized skin images into the leftArray
    this.leftArray = shuffledSkinsArray.slice();
    this.rightArray = shuffledHatsArray.slice();

    this.previewedSkin = this.unknown;
    this.previewedHat = this.unknown;
    this.selector = "skin";
    this.gachaMode = "normal";
    this.keySelector = "unlock";

    for (let i = 0; i < this.menuMusic_names.length; i++) {this.gachaMenuMusic[i].setVolume(0.1);}

    this.userCoins = this.props.userCoins;
    this.userGems = this.props.userGems;
    this.currentSong=this.randomSong();


  };

  mouseInsideSquare(p5: p5, x: number, y: number, size: number) {
    return (p5.mouseX > x - size / 2 &&
      p5.mouseX < x + size / 2 &&
      p5.mouseY > y - size / 2 &&
      p5.mouseY < y + size / 2);
  }

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

  draw = (p5: p5) => {
    p5.background(this.bgShadeOfGray, 125);

    if (this.playingMusic && !this.currentSong.isPlaying() && this.currentSong.currentTime() <= this.currentSong.duration()) {
      this.currentSong= this.randomSong();
      this.currentSong.play();
    }

    if (!this.confirmation) {

      // Display the gachaMachine image
      p5.image(this.gachaMachine, this.imgX, this.imgY, this.imageSize, this.imageSize);

      // Iterate over the leftArray and display its values
      for (let i = 0; i < this.leftArray.length; i++) {

        const x = this.squareSize / 2 + this.spacing;
        const y = this.startY + (-this.squareSize - this.spacing) + i * (this.squareSize + this.spacing) + this.scrollLeft; // Adjust the y-position as needed
        const skin = this.leftArray[i];
        const skinName = this.allSkin_names[this.allSkinImages.indexOf(skin)];

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

        // Draw the square
        p5.push();
        p5.noFill();
        if (this.mouseInsideSquare(p5, x, y, this.squareSize)) {
          p5.stroke(this.rarityColor(rarity)); // Yellow stroke
          p5.strokeWeight(3); // Increase stroke weight
          // Check for mouse click inside the square
          if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            // Handle the click event
            this.previewedSkin = skin;
          }
        } else {
          p5.noStroke();
        }

        p5.rect(x, y, this.squareSize, this.squareSize);
        p5.pop();

        // Display the image inside the square
        p5.image(skin, x, y, this.squareSize, this.squareSize);
      }

      // Iterate over the rightArray and display its values
      for (let i = 0; i < this.rightArray.length; i++) {

        const x = p5.width - this.squareSize;
        const y = this.startY + i * (this.squareSize + this.spacing) + this.scrollRight; // Adjust the y-position as needed
        const hat = this.rightArray[i];
        const hatName = this.allHat_names[this.allHatImages.indexOf(hat)];

        let rarity: string;

        if (this.commonHat_names.includes(hatName)) {
          rarity = "common";
        } else if (this.rareHat_names.includes(hatName)) {
          rarity = "rare";
        } else if (this.epicHat_names.includes(hatName)) {
          rarity = "epic";
        } else if (this.legendaryHat_names.includes(hatName)) {
          rarity = "legendary";
        } else {
          rarity = "none"; // The skin name doesn't exist in any of the arrays
        }

        // Draw the square
        p5.push();
        p5.noFill();
        if (this.mouseInsideSquare(p5, x, y, this.squareSize)) {
          p5.stroke(this.rarityColor(rarity)); // Yellow stroke
          p5.strokeWeight(3); // Increase stroke weight
          // Check for mouse click inside the square
          if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            // Handle the click event
            this.previewedHat = hat;
          }
        } else {
          p5.noStroke();
        }

        p5.rect(x, y, this.squareSize, this.squareSize);
        p5.pop();

        // Display the image inside the square
        p5.image(hat, x, y, this.squareSize, this.squareSize);

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

      // Draw square 
      p5.push();

      // Highlight square when the mouse hovers over it
      if (this.gachaMode == "special") {
        p5.fill("gold");
        this.keySelector == "mode" ? p5.stroke("red") : p5.noStroke();
        p5.strokeWeight(3); // Increase stroke weight
      } else {
        p5.fill("white");
        p5.noStroke();
      }
      p5.rect(this.selSquareAX, this.selSquareAY, this.squareSize, this.squareSize);
      p5.pop();

      p5.push();
      p5.fill(0);


      p5.text('★', this.selSquareAX, this.selSquareAY);
      p5.pop();

      // Draw square
      p5.push();


      if (this.gachaMode == "normal") {
        p5.fill("purple");
        this.keySelector == "mode" ? p5.stroke("red") : p5.noStroke();
        p5.strokeWeight(3); // Increase stroke weight
      } else {
        p5.fill("white");
        p5.noStroke();
      }

      p5.rect(this.selSquareBX, this.selSquareBY, this.squareSize, this.squareSize);
      p5.pop();
      p5.push();
      p5.fill(0);


      p5.text('x1', this.selSquareBX, this.selSquareBY);
      p5.pop();

      p5.push();
      p5.noFill();
      p5.strokeWeight(5);

      if (this.keySelector == "unlock") {
        this.selector == "skin" ? p5.stroke("red") : p5.noStroke();
        p5.rect(this.prevSquareSkinX, this.prevSquareSkinY, this.previewSquareSize, this.previewSquareSize);
        this.selector == "hat" ? p5.stroke("red") : p5.noStroke();
        p5.rect(this.prevSquareHatX, this.prevSquareHatY, this.previewSquareSize, this.previewSquareSize);
      }

      p5.image(this.previewedSkin, this.prevSquareSkinX, this.prevSquareSkinY, this.previewSquareSize, this.previewSquareSize);
      p5.image(this.previewedHat, this.prevSquareHatX, this.prevSquareHatY, this.previewSquareSize, this.previewSquareSize);

      p5.pop();

      p5.push();
      p5.fill(0);

      if (this.previewedSkin != this.unknown) {
        p5.text(this.allSkin_names[this.allSkinImages.indexOf(this.previewedSkin)], this.prevSquareSkinX, this.selSquareAY);
      } else {
        p5.text("< Haz click\n (previsualizar)", this.prevSquareSkinX, this.selSquareAY);
      }

      if (this.previewedHat != this.unknown) {
        p5.text(this.allHat_names[this.allHatImages.indexOf(this.previewedHat)], this.prevSquareHatX, this.selSquareAY);
      } else {
        p5.text("Haz click >\n (previsualizar)", this.prevSquareHatX, this.selSquareAY);
      }

      this.gemPrice = (this.gachaMode == "special") ? 30 : 0;
      this.coinPrice = (this.gachaMode == "special") ? 0 : 30;

      if (!this.error) {
        p5.text(
          "Desbloquear: "
          + ((this.selector == "skin") ? "SKINS" : "SOMBREROS")
          + "\nModo: "
          + ((this.gachaMode == "special") ? "ESPECIAL" : "NORMAL") + ` ${this.gemPrice} gemas (${this.userGems}) ${this.coinPrice} monedas (${this.userCoins})` + "\n"
          + ((!this.enter) ? "Enter para confirmar" : "Seguro?"),
          this.imgX, this.confirmTextY);
      } else {
        p5.text("Recursos insuficientes!",
          this.imgX, this.confirmTextY);
      }


    }
    else {

      this.gachaInstance.drawArray(p5.height * 0.7);
      this.gachaInstance.scroll();

      if (this.gachaInstance.scrollAmount > 0) {
        // Display the GIF
        p5.image(this.gachaGIF, this.imgX, this.imgY, this.imageSize * 1.19, this.imageSize * 1.19);

      } else {
        // Display the gachaMachine image

        p5.image(this.gachaMachine, this.imgX, this.imgY, this.imageSize, this.imageSize);



        p5.push();
        p5.fill("black");
        p5.text(
          "Has desbloqueado "
          + ((this.selector == "skin") ? this.allSkin_names[this.allSkinImages.indexOf(this.gachaInstance.selectedValue)] : this.allHat_names[this.allHatImages.indexOf(this.gachaInstance.selectedValue)]),
          this.imgX, p5.height * 0.9);
        p5.pop();
        if (!this.enter) {
          p5.text(
            "Enter para continuar...",
            this.imgX, p5.height * 0.95);
        }
      }

    }

    

  };

  randomSong(){
    return this.gachaMenuMusic[Math.floor(Math.random() * this.gachaMenuMusic.length)];
  }

  keyPressed = (p5: p5) => {

    if(!this.buttonPress){
      this.playingMusic=true;
    }

    if (!this.confirmation) {
      if (p5.keyCode === p5.UP_ARROW) {
        this.keySelector = "unlock";
      }

      if (p5.keyCode === p5.DOWN_ARROW) {
        this.keySelector = "mode";
      }


      if (p5.keyCode === p5.LEFT_ARROW) {
        if (this.keySelector == "unlock") {
          this.selector = "skin";
        } else if (this.keySelector == "mode") {
          this.gachaMode = "special";
        }
      }

      if (p5.keyCode === p5.RIGHT_ARROW) {
        if (this.keySelector == "unlock") {
          this.selector = "hat";
        } else if (this.keySelector == "mode") {
          this.gachaMode = "normal";
        }
      }

      if (p5.keyCode === p5.ENTER) {
        if (!this.enter) {
          this.enter = true;
        } else {
          if (this.userCoins >= this.coinPrice && this.userGems >= this.gemPrice) {
            const costUser = () => {
              fetch("/api/GachaCostReq", {
                method: "PUT",
                body: JSON.stringify({
                  "coinCost": -this.coinPrice,
                  "gemCost": -this.gemPrice,
                  "user": this.props.userName
                }),
                headers: {
                  "content-type": "application/json",
                },
              }).catch((e) => console.log(e));
            };
            costUser();

            this.confirmation = true;
            this.enter = false;

            let finalArray;
            let elementNames;

            let commonElements;
            let rareElements;
            let epicElements;
            let legendaryElements;

            let rarities;

            if (this.selector == "skin") {

              const nc: number = this.commonSkin_names.length;
              const nr: number = this.rareSkin_names.length;
              const ne: number = this.epicSkin_names.length;
              const nl: number = this.legendarySkin_names.length;

              commonElements = [...this.allSkinImages.slice(0, nc)];
              rareElements = [...this.allSkinImages.slice(nc, nc + nr)];
              epicElements = [...this.allSkinImages.slice(nc + nr, nc + nr + ne)];
              legendaryElements = [...this.allSkinImages.slice(nc + nr + ne, nc + nr + ne + nl)];

              rarities=[this.commonSkin_names,this.rareSkin_names,this.epicSkin_names,this.legendarySkin_names];

            } else {
              const nc: number = this.commonHat_names.length;
              const nr: number = this.rareHat_names.length;
              const ne: number = this.epicHat_names.length;
              const nl: number = this.legendaryHat_names.length;

              commonElements = [...this.allHatImages.slice(0, nc)];
              rareElements = [...this.allHatImages.slice(nc, nc + nr)];
              epicElements = [...this.allHatImages.slice(nc + nr, nc + nr + ne)];
              legendaryElements = [...this.allHatImages.slice(nc + nr + ne, nc + nr + ne + nl)];

              rarities=[this.commonHat_names,this.rareHat_names,this.epicHat_names,this.legendaryHat_names];

            }

            this.shuffleArray(commonElements);
            this.shuffleArray(rareElements);
            this.shuffleArray(epicElements);
            this.shuffleArray(legendaryElements);

            
            if (this.gachaMode == "special") {
              finalArray = [...commonElements.slice(0, 3), ...rareElements.slice(0, 3), ...epicElements.slice(0, 3), ...legendaryElements.slice(0, 3)];
            } else {
              finalArray = [...commonElements.slice(0, 5), ...rareElements.slice(0, 4), ...epicElements.slice(0, 2), ...legendaryElements.slice(0, 1)];
            }

            if (this.selector == "skin") {
              elementNames = finalArray.map(image => {
                const index = this.allSkinImages.indexOf(image);
                return this.allSkin_names[index];
              });
            }else{
              elementNames = finalArray.map(image => {
                const index = this.allHatImages.indexOf(image);
                return this.allHat_names[index];
              });
            }


            if (this.gachaMode == "special") {
              this.gachaInstance = new Gacha(p5, finalArray,elementNames, [3, 3, 3, 3], [0.2, 0.3, 0.3],rarities, p5.width);
            } else {
              this.gachaInstance = new Gacha(p5, finalArray,elementNames, [5, 4, 2, 1], [0.4, 0.3, 0.2],rarities, p5.width);
            }

            this.gachaInstance.generateRandomChoice();

          } else {
            this.error = true;
          }
        }
      }

      if (p5.keyCode === 27) {
        this.enter = false;
        this.error = false;
      }
    } else {
      if (p5.keyCode === p5.ENTER) {
        if (!(this.gachaInstance.scrollAmount > 0)) {
          this.enter = true;

          //CODE FOR SKIN ADQUISITION
          const GetSkin = () => {
            fetch("/api/GachaAcquireReq", {
              method: "PUT",
              body: JSON.stringify({
                "object": ((this.selector == "skin") ? this.allSkin_names[this.allSkinImages.indexOf(this.gachaInstance.selectedValue)] : this.allHat_names[this.allHatImages.indexOf(this.gachaInstance.selectedValue)]),
                "type": this.selector,
                "user": this.props.userName
              }),
              headers: {
                "content-type": "application/json",
              },
            }).catch((e) => console.log(e));
          };
          GetSkin();
          for (let i = 0; i < this.menuMusic_names.length; i++) {this.gachaMenuMusic[i].stop();}
          this.currentSong.stop();
          this.buttonPress=true;
          this.playingMusic=false;
          setTimeout(() => { location.reload(); }, 1000);
        }
      }
    }

  };

  mouseClicked = (p5: p5) => {

    if(!this.buttonPress){
      this.playingMusic=true;
    }

    if (!this.confirmation) {
      this.keySelector = "";
      // Check if the mouse clicked inside square A
      if (this.mouseInsideSquare(p5, this.selSquareAX, this.selSquareAY, this.squareSize)) {
        this.gachaMode = "special";
      }

      // Check if the mouse clicked inside square B
      if (this.mouseInsideSquare(p5, this.selSquareBX, this.selSquareBY, this.squareSize)) {
        this.gachaMode = "normal";
      }

      // Check if the mouse clicked inside skin preview square
      if (this.mouseInsideSquare(p5, this.prevSquareSkinX, this.prevSquareSkinY, this.previewSquareSize)) {
        this.selector = "skin";
      }

      // Check if the mouse clicked inside hat preview square
      if (this.mouseInsideSquare(p5, this.prevSquareHatX, this.prevSquareSkinY, this.previewSquareSize)) {
        this.selector = "hat";
      }
    }
  };
  
  render() {
    const { router } = this.props;

    async function logout() {
      await fetch('/api/getSessions', {
        method: "DELETE",
      });
      router.push('/login');
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Sketch
            preload={this.preload}
            setup={this.setup}
            draw={this.draw}
            windowResized={this.windowResized}
            keyPressed={this.keyPressed}
            mouseClicked={this.mouseClicked}
          />
        </div>
        <div className={styles.flex}>
                <div style={{width:'12%'}} className={styles.buttonContainer}>
                  <PPCButton image="/sprites/generalAssets/START GAME.png" func={()=>{router.push('/game')}} st={{width:'100%'}}></PPCButton>                  
                </div>
                <div style={{width:'12%'}} className={styles.buttonContainer}>
                  <PPCButton image="/sprites/generalAssets/PROFILE.png" func={()=>{router.push('/profile')}} st={{width:'100%'}}></PPCButton>                  
                </div>
                <div style={{width:'12%'}} className={styles.buttonContainer}>
                  <PPCButton image="/sprites/generalAssets/ASPECT.png" func={()=>{router.push('/aspect')}} st={{width:'100%'}}></PPCButton>                  
                </div>
                <div style={{width:'12%'}} className={styles.buttonContainer}>
                  <PPCButton image="/sprites/generalAssets/RANKINGS.png" func={()=>{router.push('/rankings')}} st={{width:'100%'}}></PPCButton>
                </div>
                <div style={{width:'12%'}} className={styles.buttonContainer}>
                  <PPCButton image="/sprites/generalAssets/LOG-OUT.png" func={logout} st={{width:'100%'}}></PPCButton>
                </div>
                </div>   
                          

            </div>
    );
  }

}

export default withRouter(App);