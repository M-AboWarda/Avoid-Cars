class Car {
    constructor(){
        let red   =  rand(20,205);//-----|\
        let green =  rand(20,205);//-----|||--Car color
        let blue  =  rand(20,205);//-----|/

        this.x = rand(0, c.width)-(set.cars.width/2);                       //random x positin from the middel of the car on the hole canvas width
        this.y = rand(-set.cars.height-350,-set.cars.height);               //random y positin from the bottom of the car between -350 and 0
        this.width  = set.cars.width;
        this.height = set.cars.height;
        this.speed = rand(5,set.cars.speedInterval);                         //random speed between 5 and setting's speed interval
        this.color = "rgb("+red+","+green+","+blue+")";                     //random color for the car
        this.subColor = "rgb("+(red-15)+","+(green-15)+","+(blue-15)+")";   //same color but darkar
    }

    //draw the car
    draw(){
        //send this car to the top and change it position and speed if the car rech the bottom
        if(this.y > c.height){
            this.y = -this.height;
            this.x = rand(0, c.width)-(this.width/2);
            this.speed = rand(5, set.cars.speedInterval);
        }

        //draw car's parts
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(this.x - this.width*.1, this.y + this.height*.1, this.width + this.width*.2, this.height/4.4);//car's back wheels
        ctx.fillRect(this.x - this.width*.1, this.y + this.height-this.height*.1-this.height/4.4, this.width + this.width*.2, this.height/4.4);//car's front wheels
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height); //car shape
        ctx.fillStyle = this.subColor;
        ctx.fillRect(this.x, this.y, this.width*.1, this.height); //car's left edge
        ctx.fillRect(this.x + this.width*.9, this.y, this.width*.1, this.height); //car's right edge
        ctx.fillStyle = "rgb(111,200,200)";
        ctx.fillRect(this.x + this.width*.1, this.y + this.height - this.height*.40 - this.width*.2, this.width-this.width*.2, this.height*.25); //car's front galss
        ctx.fillRect(this.x + this.width*.1, this.y + this.height*.20 - this.width*.2, this.width-this.width*.2, this.height*.07); //car's back galss
        ctx.beginPath();
        ctx.fillStyle = "rgb(225,225,225)";
        ctx.arc(this.x + this.width*.2 +this.width*.1 , this.y  + this.height , this.width*.2 ,Math.PI ,0); //car left light   
        ctx.arc(this.x + this.width -this.width *.2 -this.width*.1 , this.y  + this.height , this.width*.2 ,Math.PI ,0); //car right light  
        ctx.fill();
    }
}