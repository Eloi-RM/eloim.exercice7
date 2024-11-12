//----------DOM----------
const menuUI = document.querySelector(".menu-ui")
const inputPlayers = document.querySelector(".input-players")
const playersValidateButton = document.querySelector(".players-validate-button")

const gameUI = document.querySelector(".game-ui")
const turnIndicator = document.querySelector(".turn-indicator-title")
const matchesIndicator = document.querySelector(".matches-left-para")
const matchesContainer = document.querySelector(".matches-container")
const matchesPickedPara = document.querySelector(".matches-picked-para")
const passTurnButton = document.querySelector(".pass-turn-button")
//-----------------------

const initialMatches = 50
let totalMatches = initialMatches
let playerNumber = 1
let playerTotalNumber = 0

let matchesAmmo = 0

function init(){
    draw("turn")
    hide("game")
    matchesDisplay()
}

playersValidateButton.addEventListener('click', ()=>{
    playerTotalNumber = inputPlayers.value
    if (playerTotalNumber > 1){
        hide("menu")
    }
})

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
        update()
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
            turnIndicator.innerText = `Player ${playerNumber} lose`
        break
        default:
        break
    }
}

function hide(ui){
    switch (ui){
        case "menu":
            menuUI.style.display = "none"
            gameUI.style.display = "flex"
        break

        case "game":
            menuUI.style.display = "flex"
            gameUI.style.display = "none"
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
    if (matchesAmmo == 0 || totalMatches == 0){
        passTurnButton.disabled = true
    }
    else{
        passTurnButton.disabled = false
    }
}

init()