import Player from './Player';
import Level from "./Level";
import Tile from "./Tile"
import p5 from 'p5';

export default class GameLogic {
    player:Player|any;
    level:Level|any;
    levelGraphics:any[];
    levelLayouts:any;
    
    xOffset:number=0;
    yOffset:number=0;
    prevxOffset:number=0;
    prevyOffset:number=0;

    generalAssets:any;

    scrollSpeed:number|any;
    nextLevel:Tile[][]|any;
    scroll:number=0;
    pause:boolean=false;
    pauseCooldown:number=0;
    joever:boolean=true;

    coins:number;
    gems:number;
    playerSkin: p5.Image;

    p:p5;

    constructor(userData:any|{coins:number,gems:number,image:any},
                gameDetails:any|{playerSizeModifier:number,gravityModifier:number,scrollSpeed:number},
                generalAssets:any,levelGraphics:any[],levelLayouts:any,
                p:p5) {

        this.generalAssets=generalAssets;
        this.levelGraphics=levelGraphics;
        this.levelLayouts=levelLayouts;

        this.coins=userData.coins;
        this.gems=userData.gems;
        this.playerSkin=userData.image;
        this.p=p;                    
        
        this.level = new Level({
            rows: 10, cols: 21, 
            initialLayout: this.levelLayouts.defaultLevelLayouts[0],
            tile_size: 60, 
            images: this.levelGraphics[0]},
            this.p);

        this.player = new Player({
            //Game defined
            width   : this.level.tile_size*gameDetails.playerSizeModifier,
            height  : this.level.tile_size*gameDetails.playerSizeModifier,
            gravity : this.level.tile_size*gameDetails.gravityModifier,
            initialX : this.xOffset + 2 * this.level.tile_size,
            initialY : this.yOffset + 2 * this.level.tile_size,
            
            //Skin defined
            jumpVelocity : -this.level.tile_size*0.2,
            speed : 5,
            jumps : 2,

            //Player defined
            image : this.playerSkin},
            this.p);

        //Graphical adjustments
        this.xOffset =  (this.p.windowWidth - this.level.levelWidth) / 2;
        this.yOffset =  (this.p.windowHeight - this.level.levelHeight) / 2;
        this.prevxOffset = this.xOffset;
        this.prevyOffset = this.yOffset;

        this.scrollSpeed=gameDetails.scrollSpeed;

        this.nextLevel=this.level.createLayout(this.levelLayouts.defaultWorldLayouts[0],this.levelGraphics[1]);

    }

    resize(){
        //Calculate new centering adjustment for the current level based on its size
        this.xOffset = (this.p.windowWidth - this.level.levelWidth) / 2;
        this.yOffset = (this.p.windowHeight - this.level.levelHeight) / 2;
        //Adjust the player accordingly based on the size changes
        this.player.movePlayer(this.xOffset-this.prevxOffset,this.yOffset-this.prevyOffset);
        //Save the new value of the offset
        this.prevxOffset=this.xOffset;
        this.prevyOffset=this.yOffset;
    }

    handleGame(debug:boolean){
        //DRAWING THE ELEMENTS OF THE GAME
        this.level.drawBackground(this.xOffset,this.yOffset);
        this.level.draw(this.xOffset+this.scroll,this.yOffset); //Dynamic, moves based on the scroll
        this.level.drawCorners(this.xOffset,this.yOffset);
        this.player.draw();

        //Visually show pause cooldown
        this.p.push();
            this.p.fill("green");
            this.p.noStroke();
            this.p.rect(this.xOffset,
                        this.yOffset+this.level.levelHeight,
                        this.p.map(this.pauseCooldown,0,300,0,this.level.levelWidth-this.level.tile_size),
                        this.level.tile_size*0.2);
        this.p.pop();

        //COLLISIONS
        this.player.rightCollisionFlag=false; //set the collision on the right to false every frame if it isnt colliding with anything
        this.handleCollisions(this.xOffset+this.scroll,this.yOffset,debug); //Dynamic, moves based on the scroll
        this.handlePlayfieldCornerCollisions();

        //MOVEMENT
        if(this.player.isAlive){ //If the player is dead game ends over all other things
            if(!this.pause){ //If game isn't paused
                this.player.update();   //Enable player movement
                this.player.keyMovement();  
                if(this.joever){ //Disables scrolling if no more level is found
                    this.scroll-=this.scrollSpeed; //Enable scrolling
                    this.player.movePlayer(-this.scrollSpeed,0); //Player movement due to the scrolling
                }
            }else{
                this.level.tintScreen(this.xOffset,this.yOffset,"gray");
                this.showGameInfo();
                
            }
        }else{
                this.level.tintScreen(this.xOffset,this.yOffset,"black");
        }

        //SCROLLING
        if(Math.abs(this.scroll)>this.level.tile_size){ // Scrolling of 1 tile
            /*
            Here goes the code for random level generation
            */
            let nextCol=this.getNextLevelCol(); //Get the next column of the level
            if(nextCol==undefined){ this.joever=false;}   //Bandaid fix that disables scrolling if no more level is found
            this.level.replaceLeftmostColumn(nextCol);  //Replace the now non visible column with the new one
            this.player.movePlayer(this.scrollSpeed,0);     //adjust the player (for some reason)
            this.scroll=0;  //reset the scrolling offset (simulate infiniteness)
        }

        //PAUSE
        if(this.pauseCooldown>0 && this.pause==false){ this.pauseCooldown-=1; }//Only decrease the timer if we have paused and the game is currently unpaused
    }

    showGameInfo(){
        this.p.image(   
                        this.generalAssets[0], //pause icon
                        this.xOffset+(this.level.levelWidth/2)-this.level.tile_size,
                        this.yOffset+(this.level.levelHeight/2)-2*this.level.tile_size,
                        this.level.tile_size,
                        this.level.tile_size
                    );

        this.p.image(   
                        this.levelGraphics[0][5], //coin
                        this.xOffset+(this.level.levelWidth/2)-2*this.level.tile_size,
                        this.yOffset+(this.level.levelHeight/2)-1*this.level.tile_size,
                        this.level.tile_size,
                        this.level.tile_size
                    );

        this.p.image(   
                        this.levelGraphics[0][6], //gem
                        this.xOffset+(this.level.levelWidth/2)-2*this.level.tile_size,
                        this.yOffset+(this.level.levelHeight/2)-0*this.level.tile_size,
                        this.level.tile_size,
                        this.level.tile_size
                    );

        this.p.push();
            this.p.textSize(this.level.tile_size/2);
            this.p.text(this.coins,
                        this.xOffset+(this.level.levelWidth/2)+this.level.tile_size*0.35,
                        this.yOffset+(this.level.levelHeight/2)-this.level.tile_size*0.35
                        );
            this.p.text(this.gems,
                        this.xOffset+(this.level.levelWidth/2)+this.level.tile_size*0.35,
                        this.yOffset+(this.level.levelHeight/2)+this.level.tile_size*0.75
                        );
        this.p.pop();
    }

    handlePlayfieldCornerCollisions(){
        // calculate the player's bounding box
        let playerLeft = this.player.x;
        let playerRight = this.player.x + this.player.width;
        let playerTop = this.player.y;
        let playerBottom = this.player.y + this.player.height;

        if(playerLeft<this.xOffset){ //Left side
            if(this.player.rightCollisionFlag){ this.player.isAlive=false; } //Squished by tile and (left) playfield border death trigger
            this.player.x=this.xOffset;
        }else if(playerRight>this.xOffset+this.level.levelWidth-this.level.tile_size){
            this.player.x=(this.xOffset+this.level.levelWidth-this.level.tile_size)-this.player.width;
        }else if(playerTop<this.yOffset){
            this.player.y=this.yOffset;
            this.player.vy=0;
        }else if(playerBottom>this.yOffset+this.level.levelHeight){
            this.player.isAlive=false; //death by falling out of the playfield
        }
    }

    detectSquareCollisions(tileLeft:number,tileRight:number,tileTop:number,tileBottom:number,debug:boolean){
        // calculate the player's bounding box
        let playerLeft = this.player.x;
        let playerRight = this.player.x + this.player.width;
        let playerTop = this.player.y;
        let playerBottom = this.player.y + this.player.height;

        // check if the player's bounding box overlaps with the tile's bounding box         
        if ((playerRight >= tileLeft) && (playerLeft <= tileRight) && (playerTop <= tileBottom) && (playerBottom >= tileTop)) {
            let overlapLeft = Math.abs(playerRight - tileLeft);
            let overlapRight = Math.abs(tileRight - playerLeft);
            let overlapTop = Math.abs(playerBottom - tileTop);
            let overlapBottom = Math.abs(tileBottom - playerTop);

            // Find the direction of the collision relative to the side of the tile, and the relevant overlap value
            let verticalCollision = overlapBottom > overlapTop ? 'top' : 'bottom';
            let verticalValue = Math.min(overlapBottom, overlapTop);
            let horizontalCollision = overlapLeft > overlapRight ? 'right' : 'left';
            let horizontalValue = Math.min(overlapLeft, overlapRight);

            if (debug) {
                //Draw hitbox of the tile we collided with
                this.player.p.push();
                this.player.p.fill(125,0,0,125);
                this.player.p.rectMode(this.player.p.CORNERS);
                this.player.p.rect(tileLeft,tileTop,tileRight,tileBottom);
                this.player.p.pop();
            }

            //Determine the side of the collision
            if (verticalValue < horizontalValue) {
                if (verticalCollision == "top") {
                    return ["top",verticalValue];
                } else {
                    return ["bottom",verticalValue];
                }
            } else {
                if (horizontalCollision == "left") {
                    return ["left",horizontalValue];
                } else {
                    return ["right",horizontalValue];
                }
            }
        }

        return ["none"]
    }

    handleCollisions(xOffset: number, yOffset: number ,debug: boolean) {
        // loop through the grid array and check for collisions
        let tileLeft:number;
        let tileRight:number;
        let tileTop:number;
        let tileBottom:number;
        let dircol:any = [];

        for (let i = 0; i < this.level.rows; i++) {
            for (let j = 0; j < this.level.cols; j++) {
                switch (this.level.layout[i][j].code) {
                    case ("flo"):
                    case ("pla"):
                        // calculate the bounding box of the tile
                        tileLeft = xOffset + (j * this.level.tile_size);
                        tileRight = xOffset + ((j + 1) * this.level.tile_size);
                        tileTop = yOffset + (i * this.level.tile_size);
                        tileBottom = yOffset + ((i + 1) * this.level.tile_size);

                        dircol = this.detectSquareCollisions(tileLeft,tileRight,tileTop,tileBottom,debug);
                        switch(dircol[0]){
                            case("top"):
                                this.player.y -= dircol[1];   //Get the player out of the tile
                                this.player.vy = 0; //Reset vertical velocity
                                this.player.movePlayer(0,-2+this.player.gravity); //Adjust for other collisions
                                this.player.jumps = this.player.defaultJumps; //Reset jump count
                            break;
                            case("bottom"):
                                this.player.y += dircol[1] + this.player.vy; //Get the player out of the tile
                                this.player.vy=0; //Reset vertical velocity
                                this.player.movePlayer(0,1);  //Adjust for other collisions
                            break;
                            case("left"):
                                this.player.rightCollisionFlag=true;
                                this.player.x -= dircol[1]; //Get the player out of the tile
                                this.player.movePlayer(this.player.vleft,0); //Adjust for other collisions
                            break;
                            case("right"):
                            this.player.x += dircol[1]; //Get the player out of the tile
                            this.player.movePlayer(this.player.vright,0); //Adjust for other collisions
                            break;
                        }
                    break;

                    case ("spi"):
                        // calculate the bounding box of the tile
                        tileLeft = xOffset + (j * this.level.tile_size) + (0.1 * this.level.tile_size);
                        tileRight = xOffset + ((j + 1) * this.level.tile_size) - (0.1 * this.level.tile_size);
                        tileTop = yOffset + (i * this.level.tile_size) + (0.6 * this.level.tile_size);
                        tileBottom = yOffset + ((i + 1) * this.level.tile_size);

                        dircol = this.detectSquareCollisions(tileLeft,tileRight,tileTop,tileBottom,debug);
                        if(dircol!="none"){
                            /* Death triggers */
                            this.player.isAlive = false;
                        }
                    break;

                    case ("coi"):
                    case ("gem"):
                        // calculate the center and radius of the ellipse
                        let centerX = xOffset + (j * this.level.tile_size) + (this.level.tile_size * 0.5);
                        let centerY = yOffset + (i * this.level.tile_size) + (this.level.tile_size * 0.5);
                        let radiusX = this.level.tile_size * 0.35;
                        let radiusY = this.level.tile_size * 0.35;

                        // check if the player's bounding box overlaps with the tile's ellipse
                        if (this.player.x < centerX + radiusX && this.player.x+this.player.width > centerX - radiusX && this.player.y < centerY + radiusY && this.player.y+this.player.height > centerY - radiusY) {
                            if(this.level.layout[i][j].code=="coi"){
                                this.coins++;
                            }else{
                                this.gems++;
                            }
                            this.level.layout[i][j].code = "000";
                            this.level.layout[i][j].image = this.levelGraphics[0][0];
                            
                        }
                    break;

                    default: break;
                }
            }
        }
    }

    setNextLevel(rawLayout:string[],lvlselection:number){
        this.nextLevel=this.level.createLayout(rawLayout);
    }

    getNextLevelCol(){
        let newColumn=[];
        for (let i = 0; i < this.level.rows; i++) {
            newColumn[i]=this.nextLevel[i].shift(); // Remove the leftmost element from the row and save it
        }
        if(newColumn[0]!=undefined){
            return newColumn;
        }
        return undefined;
    }

    pauseGame(){
        if(this.pause==false && this.pauseCooldown==0){
            this.pause=true;
            this.pauseCooldown=300;
        }else{
            this.pause=false;
        }
    }

    keyInteractions(keyCode:number){
        switch(keyCode){
            case(this.p.UP_ARROW):
                this.player.isJumping=true;
            break;
            case(80): // p
            case(27): // esc
                this.pauseGame();
            break;
        }
    }
}