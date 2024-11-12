//----------DOM----------
const turnIndicator = document.querySelector(".turn-indicator-title")
const gameOverTitle = document.querySelector(".game-over-title")
const inputField = document.querySelector(".input")
const matchesIndicator = document.querySelector(".matches-left-para")
const validateButton = document.querySelector(".validate-button")
//-----------------------

const initialMatches = 50
let totalMatches = initialMatches
let playerNumber = 1
let playerTotalNumber = 0

function game(){
    askHowManyPlayers()
    draw("turn")
}

function gameloop(){
    const pickedMatches = askPlayer()
    retractMatches(pickedMatches)
    checkWin()
    draw("matches")
    switchPlayer()
    draw("turn")
}

validateButton.addEventListener('click', ()=>{
    if (totalMatches > 0){
        gameloop()
    }
})

function askPlayer(){
    const pickedMatches = inputField.value
    return pickedMatches
}

function retractMatches(matches){
    totalMatches -= matches
}

function checkWin(){
    if (totalMatches <= 0){
        totalMatches = 0
        draw("gameOver")
    }
}

function switchPlayer(){
    if (playerNumber<playerTotalNumber){
        playerNumber += 1
    }
    else{
        playerNumber = 1
    }
}

function askHowManyPlayers(){
    while (playerTotalNumber <= 0){
        playerTotalNumber = prompt("How many people are playing?")
    }
}

function draw(element){

    switch (element){
        case "turn":
            turnIndicator.innerText = `Player ${playerNumber} turn :`
        break
        case "matches":
            matchesIndicator.innerText = `There is ${totalMatches} matches left`
        break
        case "gameOver":
            gameOverTitle.innerText = `Player ${playerNumber} lose`
        break
        default:
        break
    }
}

game()