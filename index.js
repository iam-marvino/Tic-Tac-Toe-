let X_Class = 'x'
let CIRCLE_Class = 'circle';
let WINNING_COMBINATION = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8]
]

let cellElement = document.querySelectorAll('[data-cell]');
let board = document.getElementById('board')
let winningMessageElement = document.getElementById('winning-message')
let restartButton = document.getElementById('restart-button')
let winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn


startGame()

restartButton.addEventListener('click',startGame)


function startGame(){
circleTurn = false
cellElement.forEach(cell => {
    cell.classList.remove(X_Class)
    cell.classList.remove(CIRCLE_Class)
    cell.removeEventListener('click',handleClick)
    cell.addEventListener('click', handleClick,{once: true})
})
setBoardHoverClass()
winningMessageElement.classList.remove('show')
}

function handleClick(e){
let cell = e.target
let currentClass = circleTurn ? CIRCLE_Class : X_Class
placeMark(cell, currentClass)
if (checkWin(currentClass)) {
    endGame(false)
}
else if (isDraw()){endGame(true)}
else {swapTurns()
setBoardHoverClass()}
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!!!'

    }
    else{ winningMessageTextElement.innerHTML = circleTurn ? "O's" + ' Wins' : "X's" + ' Wins'

    }
 winningMessageElement.classList.add('show')
}



function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(CIRCLE_Class)
    })
}



function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(CIRCLE_Class)
    if(circleTurn){ board.classList.add(CIRCLE_Class)}
    else{board.classList.add(X_Class)}
}

function checkWin(currentClass){
  return WINNING_COMBINATION.some(combination => {
    return combination.every(index => {
        return cellElement[index].classList.contains(currentClass)
    })
  })

}