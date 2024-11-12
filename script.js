//----------DOM----------
const menuUI = document.querySelector(".menu-ui")
const inputPlayers = document.querySelector(".input-players")
const playersValidateButton = document.querySelector(".players-validate-button")

const gameUI = document.querySelector(".game-ui")
const turnIndicator = document.querySelector(".turn-indicator-title")
const gameOverTitle = document.querySelector(".game-over-title")
const inputField = document.querySelector(".input-matches")
const matchesIndicator = document.querySelector(".matches-left-para")
const validateButton = document.querySelector(".validate-button")
//-----------------------

const initialMatches = 50
let totalMatches = initialMatches
let playerNumber = 1
let playerTotalNumber = 0

function game(){
    draw("turn")
    hide("game")
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

playersValidateButton.addEventListener('click',()=>{
    playerTotalNumber = inputPlayers.value
    if (playerTotalNumber > 1){
        hide("menu")
    }
})

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

function hide(ui){
    switch (ui){
        case "menu":
            for(const child of menuUI.children){
                child.style.display = "none"
            }
            for(const child of gameUI.children){
                child.style.display = "flex"
            }
        break

        case "game":
            for(const child of menuUI.children){
                child.style.display = "flex"
            }
            for(const child of gameUI.children){
                child.style.display = "none"
            }
        break
    }
}

game()