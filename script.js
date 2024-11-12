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
const matchesContainer = document.querySelector(".matches-container")
const matchesPickedPara = document.querySelector(".matches-picked-para")
const passTurnButton = document.querySelector(".pass-turn-button")
//-----------------------

const initialMatches = 50
let totalMatches = initialMatches
let playerNumber = 1
let playerTotalNumber = 0

let matchesAmmo = 0

function game(){
    draw("turn")
    hide("game")
    matchesDisplay()
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
    matchesAmmo ++
    checkGameStatus()
    draw("matches")
    update()
}

function checkGameStatus(){
    if (matchesAmmo == 6){
        switchPlayer()
        matchesAmmo = 0
    }
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
    draw("turn")
    update()
}

playersValidateButton.addEventListener('click', ()=>{
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
            matchesPickedPara.innerText = `You picked ${matchesAmmo} matches`
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

function matchesDisplay(){
    for(let i = 0; i < 50; i++){
        const match = document.createElement("button")
        match.classList.add("match")
        match.innerHTML = '<img class="match-sprite" src="match_sprite.png"/>'
        match.addEventListener('click', ()=>{
            match.classList.add('picked')
            retractMatches(1)
        })
        matchesContainer.appendChild(match)
    }
}

passTurnButton.addEventListener('click', ()=>{
    matchesAmmo = 0
    draw("matches")
    switchPlayer()
})


function update(){
    if (matchesAmmo == 0){
        passTurnButton.disabled = true
    }
    else{
        passTurnButton.disabled = false
    }
}
game()