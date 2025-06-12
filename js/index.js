// - Um tabuleiro deve ser mostrado na tela e ser atualizado quando o jogador clicar na região que ele quer marcar;
// - Quando um jogador clicar no tabuleiro deve ser marcado um “X” ou “O” de acordo com o jogador da vez e 
// não deve ser possível clicar naquela região novamente;
// - Quando um jogador ganhar seu nome deve ser mostrado na tela e as regiões da vitória devem ser destacadas de alguma forma;
// - Em caso de empate, uma mensagem de empate deve ser mostrada na tela;
// - Deve ser possível reiniciar o jogo para jogar novamente.

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

themeSwitcher.addEventListener('click', () => {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#F5E9E2')
    root.style.setProperty('--primary-color', '#1C0804')
    root.style.setProperty('--input-bg-color', '#B1A19B')
    main.dataset.theme = 'light'
    return
  } 
  root.style.setProperty('--bg-color', '#1C0804')
  root.style.setProperty('--primary-color', '#F5E9E2')
  root.style.setProperty('--input-bg-color', '#F5E9E2')
  main.dataset.theme = 'dark'
})

document.getElementById('startGameBtn').addEventListener('click', (ev) => {
  ev.preventDefault()
  
  formSection.classList.toggle('hideFormSection')
  
  playerTurn.innerText = 'PLAYER(X) TURN: ' + namePlayerOne.value 
  boardTitle.innerText = 'TicTacToe Board'
  
  board.forEach((cell) => {cell.classList.toggle('active')})
})

board.forEach((cell) => {
  cell.addEventListener('click', (ev) => {
    const clickedCell = ev.currentTarget
    if (clickedCell.innerText !== '') {
      alert.innerText = "Local já preenchido"
      return
    }
    if (playerTurn.innerText === 'PLAYER(X) TURN: ' + namePlayerOne.value) {
      clickedCell.innerText = 'X'
      playerTurn.innerText = 'PLAYER(O) TURN: ' + namePlayerTwo.value
      alertMessage.innerText = ""
      verifyWinner()
      return
    }
    clickedCell.innerText = 'O'
    playerTurn.innerText = 'PLAYER(X) TURN: ' + namePlayerOne.value 
    alertMessage.innerText = ""
    verifyWinner()
  })
})

function verifyWinner() {

}