const X_CLASS = 'x'
const O_CLASS = 'o'
const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const winMsg = document.querySelector('[data-win-msg-txt]')
const winDiv = document.querySelector('#winMsg')
const board = document.querySelector('#board')
const restartBtn = document.querySelector('#restartBtn')
let turn


restartBtn.addEventListener('click', clearBoard)

function clearBoard() {
    winDiv.classList.remove('show')
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
    })
}

function startGame() {
    turn = false
    cellElements.forEach(cell => {
        
        cell.addEventListener('click', handleClick, {once: true})
    })
    setHover()
}

function handleClick(event) {
    const cell = event.target
    const currentClass = turn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) endGame(false)
    else if (isDraw()) endGame(true)
    else {
        swapTurns()
        setHover()
    }
}

function endGame(draw) {
    if (draw) winMsg.innerText = `Draw!`
    else winMsg.innerText = `${turn ? "O's" : "X's"} Wins!`
    winDiv.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    turn = !turn
}

function setHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (turn) board.classList.add(O_CLASS)
    else board.classList.add(X_CLASS)
}

function checkWin(currentClass) {
    return winArray.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

startGame()