// Player Factory
const createPlayer = (name, mark, index) => {
  return {
    name, mark, index
  }
};

// Gamboard Module
const Gameboard = (() => {
  const players = [];
  let activePlayer;

  const nameForm = document.querySelector('.name-form');
  const names = document.querySelectorAll('.name-form input');
  const player1name = document.querySelector('.player1 h3');
  const player2name = document.querySelector('.player2 h3');

  const startBtn = document.querySelector('.start-button');
  startBtn.addEventListener('click', () => {  
    const player1 =createPlayer(names[0].value, 'X', 0); 
    const player2 = createPlayer(names[1].value, 'O', 1);
    nameForm.remove();
    players.push(player1, player2);
    player1name.textContent = player1.name;
    player2name.textContent = player2.name;

    activePlayer = players[0];

    return players;
  })

  const board = ['','','','','','','','',''];
  const getBoard = () => board;
  const setBoard = (playIndex, mark) =>
    board[playIndex] = mark;

  let scores = [0,0];
  const getScores = () => scores;
  const incrementScore = (index) => scores[index]+= 1;
  const resetScores = () => scores =[0,0];

  const getActivePlayer = () => activePlayer;
  const swapActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
  
  const resetBoard = () => {
    board.length = 9;
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  }

  return {
    getBoard,
    setBoard,
    getScores,
    incrementScore,
    resetScores,
    getActivePlayer,
    swapActivePlayer,
    resetBoard,
    players
  }
})();

// Game Module
const Game = (() => {
  let gameOver = false;
 
  const cells = document.querySelectorAll('.cell');
  const buttonsContainer = document.querySelector('.buttons-container');
  const gameboardContainer = document.querySelector('.gameboard-container');
  const message = document.querySelector('.message');
  const scorePlayer1 = document.querySelector('div.player1 .score');
  const scorePlayer2 = document.querySelector('div.player2 .score');
  
  buttonsContainer.addEventListener('click', handleButtonClick);
  
  gameboardContainer.addEventListener('click', handleCellClick);
  
  function handleButtonClick(e) {
    if(e.target.className === 'reset-score') {
      Gameboard.resetScores();
      scorePlayer1.textContent = `${Gameboard.getScores()[0]}`;
      scorePlayer2.textContent = `${Gameboard.getScores()[1]}`
    } else if(e.target.className === 'reset-board') {
      newGame();
    }
  }

  function handleCellClick(e) {
    if(Gameboard.getBoard()[e.target.id] === '' && gameOver === false) {
      e.target.textContent = Gameboard.getActivePlayer().mark;
      Gameboard.setBoard(e.target.id, Gameboard.getActivePlayer().mark);
      checkWin();
      Gameboard.swapActivePlayer();
    } 
    console.log(Gameboard.getBoard());
  }

  function playRound() {

    // let play = prompt(`${Gameboard.getActivePlayer().name}'s turn. Select a space from 0-8`);
    
    // if (Gameboard.getBoard()[play] === '') {
    //   Gameboard.setBoard(play, Gameboard.getActivePlayer().mark);
    //   console.log(Gameboard.getBoard());
    //   checkWin();
    //   Gameboard.swapActivePlayer();
    // } else if (play > 8 || play < 0 || typeof play !== 'number' ) {
    //   alert(`Invalid choice. Select a number from 0-8`);
    //   playRound();
    // } else if(Gameboard.getBoard()[play] !== ''){
    //   alert(`Space already taken. Select a different space from 0-8`);
    //   playRound();
    // }     

    // if (Gameboard.getBoard().includes('') && gameOver === false) {
    //   playRound()
    // } else if(gameOver === true) {
    //   prompt('Would you like to play again? Y/N') === 'Y' ? newGame() : alert('Game Over!');
    // } 
  }

  function newGame() {  
    Gameboard.resetBoard();
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    message.classList.remove('winner');
    gameOver = false;
    playRound();
  }

  function checkWin() {
    const winConditions = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    let board = Gameboard.getBoard();

    for (let i = 0; i < winConditions.length; i++) {
      if (board[winConditions[i][0]] === 'X' && board[winConditions[i][1]] === 'X' && board[winConditions[i][2]] === 'X') {
        message.innerHTML = `
        <p>${Gameboard.players[0].name} wins!</p>
        <button class="reset-board">Play Again</button>`;
        message.classList.add('winner');
        message.addEventListener('click', handleButtonClick)
        Gameboard.incrementScore(0);
        gameOver = true;
        scorePlayer1.textContent = `${Gameboard.getScores()[0]}`
      } else if (board[winConditions[i][0]] === 'O' && board[winConditions[i][1]] === 'O' && board[winConditions[i][2]] === 'O') {
        message.innerHTML = `
        <p>${Gameboard.players[1].name} wins!</p>
        <button class="reset-board">Play Again</button>`;
        Gameboard.incrementScore(1);
        message.classList.add('winner');
        message.addEventListener('click', handleButtonClick)
        gameOver = true;
        scorePlayer2.textContent = `${Gameboard.getScores()[1]}`
      } else if(!board.includes('')) {
        message.innerHTML = 
        `<p>Draw!</p><button class="reset-board">Play Again</button>`
        message.classList.add('winner');
        message.addEventListener('click', handleButtonClick)
        gameOver = true;
      }   
    }
  }

  return {
    playRound,
    // initializeGame
  }
})();

// To Do's
// 1. add player input to customize names