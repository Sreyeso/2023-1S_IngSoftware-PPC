import Player from './Player';
import Level from "./Level";
import Tile from "./Tile"
import p5 from 'p5';

export default class GameLogic {
    player:Player;
    level:Level;
    scrollSpeed:number;
    scroll:number=0;
    nextLevel:Tile[][];
    pause:boolean=false;
    pauseCooldown:number=0;
    joever:boolean;

    constructor(player:Player,level:Level,initialScrollSpeed:number) {
        this.player=player;
        this.level=level;
        this.scrollSpeed=initialScrollSpeed;
        this.nextLevel=[];
        this.joever=true;
    }

    handleGame(xOffset:number,yOffset:number,debug:boolean){
        //DRAWING THE ELEMENTS OF THE GAME
        this.level.drawBackground(xOffset,yOffset);
        this.level.draw(xOffset+this.scroll,yOffset); //Dinamic, moves based on the scroll
        this.level.drawCorners(xOffset,yOffset);
        this.player.draw();

        //COLLISIONS
        this.player.rightCollisionFlag=false; //set the collision on the right to false every frame if it isnt colliding with anything
        this.handleCollisions(xOffset+this.scroll,yOffset,debug); //Dinamic, moves based on the scroll
        this.handlePlayfieldCornerCollisions(xOffset,yOffset);

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
                this.level.grayScreen(xOffset,yOffset);
            }
        }else{
                this.level.grayScreen(xOffset,yOffset);
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

    handlePlayfieldCornerCollisions(xOffset:number,yOffset:number){
        // calculate the player's bounding box
        let playerLeft = this.player.x;
        let playerRight = this.player.x + this.player.width;
        let playerTop = this.player.y;
        let playerBottom = this.player.y + this.player.height;

        if(playerLeft<xOffset){ //Left side
            if(this.player.rightCollisionFlag){ this.player.isAlive=false; } //Squished by tile and (left) playfield border death trigger
            this.player.x=xOffset;
        }else if(playerRight>xOffset+this.level.levelWidth-this.level.tile_size){
            this.player.x=(xOffset+this.level.levelWidth-this.level.tile_size)-this.player.width;
        }else if(playerTop<yOffset){
            this.player.y=yOffset;
            this.player.vy=0;
        }else if(playerBottom>yOffset+this.level.levelHeight){
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
                        tileTop = yOffset + (i * this.level.tile_size) + (0.4 * this.level.tile_size);
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
                                this.player.coins++;
                            }else{
                                this.player.gems++;
                            }
                            this.level.layout[i][j].code = "000";
                            if(this.level.images!=null){
                                this.level.layout[i][j].image = this.level.images[0];
                            }
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

    keyInteractions(keyCode:number,p5:p5){
        switch(keyCode){
            case(p5.UP_ARROW):
                this.player.isJumping=true;
            break;
            case(80): //p
                this.pauseGame();
            break;
        }
    }
}