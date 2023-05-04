import Player from './Player';
import Level from "./Level";

export default class GameLogic {

    static game(player: Player,level:Level,xOffset:number,yOffset:number,debug:boolean){
        //Draw the elements of the game
        level.draw(xOffset,yOffset);
        player.draw();
        this.handleCollisions(player,level,xOffset,yOffset,debug);
        if(player.isAlive){
            //Enable player movement
            player.update();
            player.keyMovement();
        }else{
            level.death(xOffset,yOffset);
        }
    }

    static detectSquareCollisions(player: Player,tileLeft:number,tileRight:number,tileTop:number,tileBottom:number,debug:boolean){
        // calculate the player's bounding box
        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerTop = player.y;
        let playerBottom = player.y + player.height;

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
                player.p.push();
                player.p.fill(125,0,0,125);
                player.p.rectMode(player.p.CORNERS);
                player.p.rect(tileLeft,tileTop,tileRight,tileBottom);
                player.p.pop();
            }

            //Determine the side of the collision
            if (verticalValue < horizontalValue) {
                if (verticalCollision == "top") {return ["top",verticalValue];} else {return ["bottom",verticalValue];}
            } else {
                if (horizontalCollision == "left") {return ["left",horizontalValue];} else {return ["right",horizontalValue];}
            }
        }

        return ["none"]
    }

    static handleCollisions(player: Player, level: Level, xOffset: number, yOffset: number ,debug: boolean) {
        // loop through the grid array and check for collisions
        let tileLeft:number;
        let tileRight:number;
        let tileTop:number;
        let tileBottom:number;
        let dircol:any = [];

        for (let i = 0; i < level.rows; i++) {
            for (let j = 0; j < level.cols; j++) {
                switch (level.layout[i][j].code) {
                    case ("gra"):
                    case ("sto"):
                    case ("111"):
                        // calculate the bounding box of the tile
                        tileLeft = xOffset + (j * level.tile_size);
                        tileRight = xOffset + ((j + 1) * level.tile_size);
                        tileTop = yOffset + (i * level.tile_size);
                        tileBottom = yOffset + ((i + 1) * level.tile_size);

                        dircol = this.detectSquareCollisions(player,tileLeft,tileRight,tileTop,tileBottom,debug);
                        switch(dircol[0]){
                            case("top"):
                                player.y -= dircol[1];   //Get the player out of the tile
                                player.vy = 0; //Reset vertical velocity
                                player.movePlayer(0,-2+player.gravity); //Adjust for other collisions
                                player.jumps = player.defaultJumps; //Reset jump count
                            break;
                            case("bottom"):
                                player.y += dircol[1] + player.vy; //Get the player out of the tile
                                player.vy=0; //Reset vertical velocity
                                player.movePlayer(0,1);  //Adjust for other collisions
                            break;
                            case("left"):
                                player.x -= dircol[1]; //Get the player out of the tile
                                player.movePlayer(player.vleft,0); //Adjust for other collisions
                            break;
                            case("right"):
                                player.x += dircol[1]; //Get the player out of the tile
                                player.movePlayer(player.vright,0); //Adjust for other collisions
                            break;
                        }
                    break;

                    case ("spi"):
                        // calculate the bounding box of the tile
                        tileLeft = xOffset + (j * level.tile_size) + (0.1 * level.tile_size);
                        tileRight = xOffset + ((j + 1) * level.tile_size) - (0.1 * level.tile_size);
                        tileTop = yOffset + (i * level.tile_size) + (0.4 * level.tile_size);
                        tileBottom = yOffset + ((i + 1) * level.tile_size);

                        dircol = this.detectSquareCollisions(player,tileLeft,tileRight,tileTop,tileBottom,debug);
                        if(dircol!="none"){
                            /* Death triggers */
                            player.isAlive = false;
                        }
                    break;

                    case ("coi"):
                    case ("gem"):
                        // calculate the center and radius of the ellipse
                        let centerX = xOffset + (j * level.tile_size) + (level.tile_size * 0.5);
                        let centerY = yOffset + (i * level.tile_size) + (level.tile_size * 0.5);
                        let radiusX = level.tile_size * 0.35;
                        let radiusY = level.tile_size * 0.35;

                        // check if the player's bounding box overlaps with the tile's ellipse
                        if (player.x < centerX + radiusX && player.x+player.width > centerX - radiusX && player.y < centerY + radiusY && player.y+player.height > centerY - radiusY) {
                            if(level.layout[i][j].code=="coi"){
                                player.coins++;
                            }else{
                                player.gems++;
                            }
                            level.layout[i][j].code = "000";
                            if(level.images!=null){
                                level.layout[i][j].image = level.images[15];
                            }
                        }
                    break;

                    default: break;
                }
            }
        }
    }
}