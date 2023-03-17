const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { board };
})();

const player = (name, marker) => {
  const getMarker = () => {
    return marker;
  };
  const getName = () => {
    return name;
  };
  return { getName, getMarker };
};

const displayController = (() => {
  const player1 = player(prompt("Player 1, enter your name:"), "x");
  const player2 = player(prompt("Player 2, enter your name:"), "o");
  let game = true;
  let activePlayer = player1;
  const turn = document.querySelector(".turn");
  turn.textContent = `It's ${activePlayer.getName()}'s turn:`


  function fillBoard() {
    for (let i = 0; i < 3; i++) {
      const row = document.querySelector(".row:nth-child(" + (i + 1) + ")");
      for (let j = 0; j < 3; j++) {
        const col = row.querySelector(".col:nth-child(" + (j + 1) + ")");
        col.addEventListener("click", () => {
        if (col.textContent === "" && game==true) { // check if cell is empty
            col.textContent = activePlayer.getMarker();
            gameBoard.board[i][j] = activePlayer.getMarker();
            playRound();
          }
        })
    }
  }
}

  

  function toggleActivePlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
      turn.textContent = `It's ${activePlayer.getName()}'s turn:`
    } else {
      activePlayer = player1;
      turn.textContent = `It's ${activePlayer.getName()}'s turn:`
    }
  }

  function endGame(player) {
    turn.textContent=`${player.getName()} Wins!`;
    game = false;
    console.log("Refresh to play again");
  }
  function checkTie() {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i][j] === "") return;
      }
    }
    game = false; // add this line to update the game variable 
    return true;
  }
  
  function Tie() {
    turn.textContent= `You Tied`;
    game = false;
    return true;
  }
  

  function checkWinner(player) {
    if (
      gameBoard.board[0][0] == gameBoard.board[0][1] &&
      gameBoard.board[0][1] == gameBoard.board[0][2] &&
      gameBoard.board[0][0] == player.getMarker()
    ) {
      return true;
    } else if (
      gameBoard.board[1][0] == gameBoard.board[1][1] &&
      gameBoard.board[1][1] == gameBoard.board[1][2] &&
      gameBoard.board[1][0] == player.getMarker()
    ) {
      return true;
    } else if (
      gameBoard.board[2][0] == gameBoard.board[2][1] &&
      gameBoard.board[2][1] == gameBoard.board[2][2] &&
      gameBoard.board[2][0] == player.getMarker()
    ) {
      return true;
    }
  
    if (
      gameBoard.board[0][0] == gameBoard.board[1][0] &&
      gameBoard.board[1][0] == gameBoard.board[2][0] &&
      gameBoard.board[0][0] == player.getMarker()
    ) {
      return true;
    } else if (
      gameBoard.board[0][1] == gameBoard.board[1][1] &&
      gameBoard.board[1][1] == gameBoard.board[2][1] &&
      gameBoard.board[0][1] == player.getMarker()
    ) {
      return true;
    } else if (
      gameBoard.board[0][2] == gameBoard.board[1][2] &&
      gameBoard.board[1][2] == gameBoard.board[2][2] &&
      gameBoard.board[0][2] == player.getMarker()
    ) {
      return true;
    }
  
    if (
      gameBoard.board[0][0] == gameBoard.board[1][1] &&
      gameBoard.board[1][1] == gameBoard.board[2][2] &&
      gameBoard.board[0][0] == player.getMarker()
    ) {
      return true;
    } else if (
      gameBoard.board[0][2] == gameBoard.board[1][1] &&
      gameBoard.board[1][1] == gameBoard.board[2][0] &&
      gameBoard.board[1][1] == player.getMarker()
    ) {
      return true;
    }
  
    return false;
  }
  
  fillBoard();
  function playRound() {
    if (checkWinner(activePlayer) == true) {
     endGame(activePlayer);
    } else if (checkTie() === true) {
       Tie();
    } else {
      toggleActivePlayer();
    }
  }
})();


