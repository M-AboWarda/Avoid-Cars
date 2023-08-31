//-------------canvas setup---------------
const c = document.querySelector("#canvas");
const ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

//----------settings------------
let set = {
    cars:{
        amount:          17,// cars quantity
        width:           50,// cars width
        height:         130,// cars height
        speedInterval:   17,// cars speed interval between 5 and speedInterval

    },
    players: {
        radius:      12,    //players radius
    }

}
//---keybord players container
let keybordPlayers = [];

//---scores container
let scores = [];
let count  = 0;
let startCounting; //the loop "setInterval"

//---check if the player is dead-----
let isGameOver = false;

//---stop the animation
let stopAnim = false;

//-----move cars
let moveCars = true;
//---------------------------------------------------------------functions//
//stop moving cars until timeMs had passed
const carsPause = timeMs =>{
    moveCars = false;
    setTimeout(()=>{
        moveCars = true;
    },timeMs);
}

//---pick a random number between min and max---
const rand = (min,max)=>{
    if(typeof(min) !== 'number' || typeof(max) !== 'number'){
    return false;
    }else if(min > max){
        alert(`The number can not be between ${min} and ${max} \nDo you mean rand( ${max} , ${min} )?`);
        return false;
    }
    return Math.floor(Math.random() * (max-min+1)) + min;
}

const _ = x =>{
    return document.querySelector(x);
}

//copied from somewhere i dont remember but i guess it is stackoverflow
//make it full screen
const toFullscreen = (element) => {
    element = document.querySelector(element);
    if(element.requestFullscreen){
        element.requestFullscreen();
    }
    else if(element.mozRequestFullscreen){
        element.mozRequestFullscreen();
    }
    else if(element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    }
    else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    }
}



const counter = ()=>{
    _("#count-con").innerHTML = count;
    count++;
}
//---------------------------------------------------------------//functions

//-----setup cars-------
let carsArr = [];                     // the array that contains all the data of the cars
const setup = ()=>{
    carsArr = [];                     // make sure that there is no car in the array
    for(let i=0; i<set.cars.amount; i++){
        carsArr.push(new Car());      // add i amount of cars (i = set.cars.amount) to the carsArr array
    }
}

const update = ()=>{

    //make the canvas fullscreen if its not
    if(c.width != window.innerWidth || c.height != window.innerHeight){
        c.width  = window.innerWidth;
        c.height = window.innerHeight;
    }

    //clear the canvas every frame
    ctx.clearRect(0,0,c.width,c.height);


    //-------move and draw all keybord players-----------
    if(typeof(keybordPlayers[0]) != 'undefined'){
        keybordPlayers.forEach(player =>{
            player.move();
            player.draw();
        });
    }
    //-------------------------------------------------
    
    //do for every singel car
    carsArr.forEach(car => {
            //draw the car 
            car.draw();

            //------ if keybord player hits a car
            if(typeof(keybordPlayers[0]) != 'undefined'){
                for(let i = 0; i<keybordPlayers.length; i++){
                    keybordPlayers[i].collision(car.x, car.y, car.width, car.height);// return true if the player touchs a car
                    //kill the player if he touchs a car after saving the name of the player and the score
                    if(keybordPlayers[i].collision(car.x, car.y, car.width, car.height)){

                        scores.unshift({//creat an object with the name and the score
                                name: keybordPlayers[i].name,
                                score: count
                            });

                        keybordPlayers.splice(i,1);
                    }
                    // if all the players is dead then stop the game
                    if(keybordPlayers.length == 0){
                        isGameOver = true;
                    }
                }
            }


            //move all cars only if moveCars is true ()
            if(!moveCars){return}
            //move this car down by it speed
            car.y += car.speed;
    });

    //go to the next frame (update the canvas) if the player is still alive
    if(!isGameOver && !stopAnim){
    return window.requestAnimationFrame(update);
    }else{//prepare to the next game
        stopAnim = false;

        //only if all players is dead
        if(isGameOver){
            isGameOver = false;//prepare to the next game

            clearInterval(startCounting);// stop the counter;
            count = 0;                   // reset the counter
            _("#count-con").style.display = "none"; //hide the counter

            _("#score").innerHTML = ``;         // clear the score sction

            //create score table
            let tbl = document.createElement("table");
            let tblRow = document.createElement("tr");
            let playerName = document.createElement("th");
            let playerScore = document.createElement("th");
            playerName.textContent = "Player Name";
            playerScore.textContent = "Score";
            tblRow.appendChild(playerName);
            tblRow.appendChild(playerScore);
            tbl.appendChild(tblRow);
            
            for(let i = 0; i < scores.length; i++){// the players and there scores
                if(i < 5){//show only first 5 players
                    let tblRow = document.createElement("tr");
                    let playerName = document.createElement("td");
                    let playerScore = document.createElement("th");
                    playerName.textContent = `< ${i+1} > ${scores[i].name}`;
                    playerScore.textContent = `${scores[i].score}`;
                    tblRow.appendChild(playerName);
                    tblRow.appendChild(playerScore);
                    tbl.appendChild(tblRow);
                }
            }
            _("#score").appendChild(tbl);
            
            //show the game start btn
            _("#settings").style.display = "block";
            setup(); //|--\__render the game as background
            update();//|--/
        }
    }

}

//start moving the keybord player
document.addEventListener("keydown",dta=>{//when the key is down

    //check if settings section is not hidden //-- !(display : none)
    const notPlaying = !(_("#settings").style.display == "none");
    if(notPlaying){return}//do nothing (do not move)

    keybordPlayers.forEach(player => {
        //else if the settings section is shown
        switch(dta.keyCode){
            case player.leftKey:  //left
                player.moveLeft = true;
                break;
            case player.upKey:  //up
                player.moveUp = true;
                break;
            case player.rightKey:  //right 
                player.moveRight = true;
                break;
            case player.downKey:  //down 
                player.moveDown = true;
                break;
            case player.boostKey://shift "boost"
                player.boost = true;
                break;
            case player.breakKey://alt "break"
                player.break = true;
                break;
        }
    });
    
});

//stop moving the keybord player
document.addEventListener("keyup",dta=>{  //when the key is up
    // console.log(dta.keyCode);
    keybordPlayers.forEach(player => {
        switch(dta.keyCode){
            case player.leftKey:  //left
                player.moveLeft = false;
                break;
            case player.upKey:  //up
                player.moveUp = false;
                break;
            case player.rightKey:  //right 
                player.moveRight = false;
                break;
            case player.downKey:  //down 
                player.moveDown = false;
                break;
            case player.boostKey://shift "boost"
                player.boost = false;
                break;
            case player.breakKey://alt "break"
                player.break = false;
                break;
        }
    });
    // if the game is off. press enter to start
    if(dta.keyCode == 13 && !(_("#settings").style.display == "none")){//enter = "start the game"
        startTheGame();
    }
});

// start the game
const startTheGame = ()=>{
    stopAnim = true;                          // stop the animation 
    setup();                                  // reset the cars 
    _("#settings").style.display = "none";    // hide the start section

    //make it fullscreen
    toFullscreen("html");

    // score counter start
    scores = [];                              // clear the score container
    startCounting = setInterval(counter,1000);// start the counter  
    _("#count-con").style.display = "block";          

    // add players      new KeybordPlayer(  name, left, up, right, down, boost, break );
    keybordPlayers.push(new KeybordPlayer("tryHard", 37, 38, 39, 40, 190, 188)); // add kebord player
    //keybordPlayers.push(new KeybordPlayer(null, 70, 84, 72, 71, 83, 65)); // add kebord player
    keybordPlayers.push(new KeybordPlayer("none-TryHard", 65, 87, 68, 83, 16, 32)); // add kebord player

    //pause
    carsPause(3000);                          // stop moving all cars until 3 seconds had passed   
    update();                                 // render the game
}

// if the play btn is clicked
_("#play-btn").addEventListener("click",() =>{
    startTheGame();
});

setup(); //|--\__render the game as a background
update();//|--/