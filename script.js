// const RLS = require('readline-sync');

const Gameboard = (function() {
  _board = new Array(9).fill('');
  const getBoard = () => _board;

  const updateBoard = (mark,space) => _board[space] = mark;

  return {
    getBoard,
    updateBoard,
  }

})();

const CreatePlayer = function(name, mark) {
  let _score = 0;
  const getScore = () => _score;
  const getName = () => name;
  const getMark = () => mark;

  function roundWinner() {
    return _score++;
  };

  return {
    getName, 
    getMark, 
    getScore, 
    roundWinner,
  }
};

const Game = (function(){


  function playRound() {


  };

  return {

  }
})();