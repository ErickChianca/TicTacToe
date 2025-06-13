const main = document.querySelector('main')
const root = document.querySelector(':root')
const themeSwitcher = document.getElementById('themeSwitcherBtn')
const formSection = document.querySelector('.formSection')

const namePlayerOne = document.getElementById('namePlayerOne')
const namePlayerTwo = document.getElementById('namePlayerTwo')
const playerTurn = document.getElementById('playerTurn') 

const board = document.querySelectorAll('.boardCedule')
const boardTitle = document.getElementById('boardTitle')
const alertMessage = document.getElementById('alert')
const filledCells = []
const restartGameBtn = document.getElementById('restartGame')
const playAgain = document.getElementById('playAgain')

themeSwitcher.addEventListener('click', () => {
  if (main.dataset.theme === 'light') {
    root.style.setProperty('--bg-color', '#1C0804')
    root.style.setProperty('--primary-color', '#F5E9E2')
    root.style.setProperty('--input-bg-color', '#F5E9E2')
    main.dataset.theme = 'dark'
    return
  } 
  root.style.setProperty('--bg-color', '#F5E9E2')
  root.style.setProperty('--primary-color', '#1C0804')
  root.style.setProperty('--input-bg-color', '#B1A19B')
  main.dataset.theme = 'light'
})

document.getElementById('startGameBtn').addEventListener('click', (ev) => {
  ev.preventDefault()
  
  formSection.classList.toggle('hideFormSection')
  
  playerTurn.innerText = 'Player Turn: ' + namePlayerOne.value + ' (X)'
  boardTitle.innerText = 'TicTacToe Board'
  restartGameBtn.classList.toggle('disabled')
  
  board.forEach((cell) => {cell.classList.toggle('active')})
})

board.forEach((cell) => {
  cell.addEventListener('click', (ev) => {
    const clickedCell = ev.currentTarget

    if (clickedCell.innerText !== '') {
      alertMessage.innerText = "Filled square"
      return
    }
    
    if (playerTurn.innerText === 'Player Turn: ' + namePlayerOne.value + ' (X)') {
      clickedCell.innerText = 'X'
      playerTurn.innerText = 'Player Turn: ' + namePlayerTwo.value + ' (O)'
      filledCells.push(clickedCell.innerText)
      alertMessage.innerText = ""
      verifyDraw()
      verifyWinner()
      didGameFinish()
      return
    } 
  
    if (playerTurn.innerText === 'Player Turn: ' + namePlayerTwo.value + ' (O)') {
      clickedCell.innerText = 'O'
      playerTurn.innerText = 'Player Turn: ' + namePlayerOne.value + ' (X)'
      filledCells.push(clickedCell.innerText)
      alertMessage.innerText = ""
      verifyDraw()
      verifyWinner()
      didGameFinish()
      return
    }

    clickedCell.innerText = ''
  })
})

function verifyWinner() {
  const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
  
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i]

    const cell1 = board[combination[0]]
    const cell2 = board[combination[1]]
    const cell3 = board[combination[2]]

    if (cell1.innerText !== '' && cell1.innerText === cell2.innerText && cell2.innerText === cell3.innerText) {
      setWinner(cell1.innerText)
      cell1.classList.toggle('win')
      cell2.classList.toggle('win')
      cell3.classList.toggle('win')
    }
  }
}

function setWinner(symbol) {
  if (symbol === 'X') {
    alertMessage.innerText = 'PLAYER (X) WON: ' + namePlayerOne.value
  } else {
    alertMessage.innerText = 'PLAYER (O) WON: ' + namePlayerTwo.value
  }
}

function verifyDraw() {
 if (filledCells.length >= 9) {
    alertMessage.innerText = 'Draw'
  }
}

function didGameFinish(ev) {
  if (alertMessage.innerText === 'PLAYER (X) WON: ' + namePlayerOne.value || alertMessage.innerText === 'PLAYER (O) WON: ' + namePlayerTwo.value || alertMessage.innerText === 'Draw') {
    restartGameBtn.classList.toggle('disabled')
    playAgain.classList.toggle('disabled')
    playerTurn.innerText = "The game has finished\nPress 'Play Again' to start a new round"
  }
}

function resetBoard() {
  board.forEach((cell) => {
    cell.innerText = ''
    cell.classList.remove('win')
    playerTurn.innerText = 'Player Turn: ' + namePlayerOne.value + ' (X)'
    alertMessage.innerText = ''
    restartGameBtn.classList.toggle('disabled')
    playAgain.classList.toggle('disabled')
    for (let i = 0; i <= filledCells.length; i++) {
      filledCells.pop()
    }
  })
}

restartGameBtn.addEventListener('click', resetBoard)
playAgain.addEventListener('click', resetBoard)