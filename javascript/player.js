class KeybordPlayer {
    constructor(name, leftK, upK, rightK, downK, boostK, breakK){
        this.name = name || "player "+ (keybordPlayers.length +1);

        this.x = c.width/2;
        this.y = c.height - .15*c.height;
        this.r = set.players.radius;
        this.randomColor = rand(0,225);

        //keys (controls) "key code"
        this.leftKey    = leftK    || 37; // left arrow           74; //j                
        this.upKey      = upK      || 38; // up arrow             73; //i      
        this.rightKey   = rightK   || 39; // right arrow          76; //l     
        this.downKey    = downK    || 40; // down arrow           75; //k      
        this.boostKey   = boostK   || 16; // shift                32; //space 
        this.breakKey   = breakK   || 18; // alt                  83; //s     

        //smooth movment
        this.moveLeft  = false;
        this.moveUp    = false;
        this.moveRight = false;
        this.moveDown  = false;
        this.boost     = false;
        this.break     = false;    
    }

    //keybord speed adjusting 
    move(){
        //check the edge
        if(this.x <= 0 + this.r) this.moveLeft = false;
        if(this.y <= 0 + this.r) this.moveUp = false;
        if(this.x >= c.width - this.r) this.moveRight = false;
        if(this.y >= c.height - this.r) this.moveDown = false;

        //move ---Default speed || Boosted---
        if(this.moveLeft){
            if(this.boost){this.x-=8}
            if(this.break){this.x-=2}
            else{this.x-=4}
        }
        if(this.moveUp){
            if(this.boost){this.y-=8}
            if(this.break){this.y-=2}
            else{this.y-=4}
        }
        if(this.moveRight){
            if(this.x >= c.width) return;
            if(this.boost){this.x+=8}
            if(this.break){this.x+=2}
            else{this.x+=4}
        }
        if(this.moveDown){
            if(this.y >= c.height) return;
            if(this.boost){this.y+=8}
            if(this.break){this.y+=2}
            else{this.y+=4}
        }
    }
    //draw the player circle on the canvas
    draw(){
        ctx.beginPath();
        // ctx.fillStyle = `rgb(${this.randomColor},${this.randomColor},${this.randomColor})`; // random player color
        ctx.fillStyle = `rgb(225,225,225)`;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }

    //(car x position, car y position, car width, car height)//
    collision(carX,carY,carW,carH){
        let dX = Math.abs(this.x - (carX +(carW/2))); //distance between the center of the player and the center of the car horizontally
        let dY = Math.abs(this.y - (carY +(carH/2)));//distance between the center of the player and the center of the car vertically
        if(dX < (carW/2) +this.r && dY < (carH/2) + this.r){
            //isGameOver = true;
            return true;
        }
        else return false;
    }

}