//----------DOM----------
const menuUI = document.querySelector(".menu-ui")
const inputPlayers = document.querySelector(".input-players")
const playersValidateButton = document.querySelector(".players-validate-button")

const gameUI = document.querySelector(".game-ui")
const turnIndicatorTitle = document.querySelector(".turn-indicator-title")
const matchesIndicatorText = document.querySelector(".matches-left-text")
const matchesContainer = document.querySelector(".matches-container")
const matchesPickedText = document.querySelector(".matches-picked-text")
const passTurnButton = document.querySelector(".pass-turn-button")
//-----------------------

const initialMatches = 36
let currentMatches = initialMatches
let playerNumber = 1
let numberOfPlayers = 0

let matchesPickedUp = 0

function init(){
    draw("turn")
    hide("game")
    matchesDisplay()
}

playersValidateButton.addEventListener('click', ()=>{
    numberOfPlayers = inputPlayers.value
    if (numberOfPlayers > 1){
        hide("menu")
    }
})

function retractMatches(matches){
    currentMatches -= matches
    matchesPickedUp ++
    checkGameStatus()
    draw("matches")
    enablePass()
}

function checkGameStatus(){
    if (matchesPickedUp == 6){
        switchPlayer()
        matchesPickedUp = 0
    }
    if (currentMatches <= 0){
        currentMatches = 0
        draw("gameOver")
        enablePass()
    }
}

function switchPlayer(){
    if (playerNumber < numberOfPlayers){
        playerNumber += 1
    }
    else{
        playerNumber = 1
    }
    draw("turn")
    enablePass()
}

passTurnButton.addEventListener('click', ()=>{
    matchesPickedUp = 0
    draw("matches")
    switchPlayer()
})

function enablePass(){
    if (matchesPickedUp == 0 || currentMatches == 0){
        passTurnButton.disabled = true
    }
    else{
        passTurnButton.disabled = false
    }
}

function draw(element){
    switch (element){
        case "turn":
            turnIndicatorTitle.innerText = `Player ${playerNumber} turn :`
        break
        case "matches":
            matchesIndicatorText.innerText = `There is ${currentMatches} matches left`
            matchesPickedText.innerText = `You picked ${matchesPickedUp} matches`
        break
        case "gameOver":
            turnIndicatorTitle.innerText = `Player ${playerNumber} lose`
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
    for(let i = 0; i < initialMatches; i++){
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

init()