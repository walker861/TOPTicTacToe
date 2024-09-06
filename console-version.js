// Console Version - Not OOP
const board = ['','','','','','','','',''];
let playIndex;

const player1 = {
  name: 'X',
  mark: 'X',
  score: 0,
  activePlayer: false,
};
const player2 = {
  name: 'O',
  mark: 'O',
  score: 0,
  activePlayer: false,
}

function initializeGame() {
  board.length = 9;
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
  }
  
  player1.activePlayer = true;
  player1.score = 0;
  player2.score = 0;

  playRound();
}

function playRound() {
  getPlayIndex();
  markBoard();
  checkWin();
  changeActivePlayer();
  console.log(board);

  if(board.includes('') ) {
    playRound()
  } else if (board.length === 0) {
    console.log('Game Over')
  } else {
    console.log('Draw');
  }
}

function changeActivePlayer() {
  if (player1.activePlayer) {
    player1.activePlayer = false
    player2.activePlayer = true; 
  } else {
    player1.activePlayer = true;
    player2.activePlayer = false; 
  }
}

function getPlayIndex() {
  playIndex = prompt(`${ player1.activePlayer ? 'O': 'X'}, choose 0-8 to place your mark on the board.`);
}

function markBoard() {
  if(board[playIndex] === '') { 
    board[playIndex] = player1.activePlayer ? player2.mark : player1.mark
  }  else {
    alert(`${board[playIndex]} has played this space. Choose another space.`);
    getPlayIndex();
  }
}

function checkWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let i = 0; i < winConditions.length; i++) {
    if (board[winConditions[i][0]] === 'X' && board[winConditions[i][1]] === 'X' && board[winConditions[i][2]] === 'X') {
      alert('X wins!');
      console.log(board);
      newGame();
    } else if (board[winConditions[i][0]] === 'O' && board[winConditions[i][1]] === 'O' && board[winConditions[i][2]] === 'O') {
      alert('O wins!');
      console.log(board);
      newGame();
    }    
  }
}


function newGame() {
  let newGame = prompt('Would you like to play again?').trim().toLowerCase();

  if (newGame === 'y' || newGame === 'yes') {
    initializeGame() 
  } else {
    alert('Game Over'); 
    board.length = 0;
  };
}