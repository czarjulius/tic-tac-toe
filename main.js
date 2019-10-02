// Set global variables
// game array, user, npc, modals and message text
var GAME = Array(9).fill(" "),
  USER,
  NPC,
  GRID = document.querySelector("#grid"),
  STARTMODAL = document.querySelector("#startModal"),
  ENDMODAL = document.querySelector("#endModal"),
  MESSAGE = document.querySelector("#statusText");

// Draw X or O
function drawSquare(idx, player) {
  var square = document.querySelector("#square" + idx);
  square.innerHTML = player;
  square.classList.add("disabled");
}

// Reset board:
// Clear game array, reset HTML elements
// hide end modal and show start 
document.querySelector('#endModal a').addEventListener('click', resetBoard)
function resetBoard() {
  GRID.classList.add("hidden");
  ENDMODAL.classList.add("hidden");
  STARTMODAL.classList.remove("hidden");
  GAME = Array(9).fill(" ");
  var squares = document.querySelectorAll(".squareText");
  for (var square in squares) {
    squares[square].innerHTML = "";
    squares[square].classList.remove("disabled");
  }
}

// Check if player has won
// Return true or false
function checkStatus(player, board) {
  var re1 = new RegExp("^" + player + player + player, "gi"),
    re2 = new RegExp("^.{3}" + player + player + player, "gi"),
    re3 = new RegExp(player + player + player + "$", "gi"),
    re4 = new RegExp(player + ".{2}" + player + ".{2}" + player, "gi"),
    re5 = new RegExp("^" + player + ".{3}" + player + ".{3}" + player, "gi"),
    re6 = new RegExp("^.{2}" + player + "." + player + "." + player, "gi"),
    reArr = [re1, re2, re3, re4, re5, re6];
  for (var i = 0; i < reArr.length; i++) {
    if (reArr[i].test(board.join(""))) {
      return true;
    }
  }
  return false;
}

// Check if board is full
// Return true or false
function checkBoard(board) {
  var current = board.join("");
  if (current.indexOf(" ") == -1) {
    return true;
  }
  return false;
}

// Start a game:
// Assign user and npc and hide start modal
document.querySelectorAll('#startModal a')
.forEach(button => button.addEventListener('click', startGame));
function startGame(event) {
  var npc = event.target.dataset.npc;
  USER = event.target.dataset.user;
  NPC = npc;
  STARTMODAL.classList.add("hidden");
  GRID.classList.remove("hidden");
  if (NPC == "X") {
    setTimeout(function() {
      npcFirstMove();
    }, 100);
  }
}

// Score a completed board
function score(board) {
  var score = 0;
  if (checkStatus(NPC, board)) {
    score = 1;
  } else if (checkStatus(USER, board)) {
    score = -1;
  }
  return score;
}

// NPC moves
function npcMove() {
  var moveObj = getBestMove(GAME, NPC),
    idx = moveObj.index;
  GAME[idx] = NPC;
  drawSquare(idx, NPC);
  if (checkStatus(NPC, GAME)) {
    MESSAGE.innerHTML = NPC + " Wins!";
    setTimeout(function() {
      GRID.classList.add("hidden");
      ENDMODAL.classList.remove("hidden");
    }, 100);
  } else if (checkBoard(GAME)) {
    MESSAGE.innerHTML = "It's a Draw.";
    setTimeout(function() {
      GRID.classList.add("hidden");
      ENDMODAL.classList.remove("hidden");
    }, 100);
  }
}

function npcFirstMove() {
  var moveObj = getBestMove([" ", "X", " ", "X", " ", "X", " ", "X", " "], NPC),
    idx = moveObj.index;
  GAME[idx] = NPC;
  drawSquare(idx, NPC);
}

// USER movessuar

var squareBoards = document.querySelectorAll('.squareText');
squareBoards.forEach(square => square.addEventListener('click', makeMove));

function makeMove(event) {
  const idx = event.target.dataset.id;
  GAME[idx] = USER;
  drawSquare(idx, USER);
  if (checkStatus(USER, GAME)) {
    MESSAGE.innerHTML = USER + " Wins!";
    setTimeout(function() {
      GRID.classList.add("hidden");
      ENDMODAL.classList.remove("hidden");
    }, 100);
  } else if (checkBoard(GAME)) {
    MESSAGE.innerHTML = "It's a Draw.";
    setTimeout(function() {
      GRID.classList.add("hidden");
      ENDMODAL.classList.remove("hidden");
    }, 100);
  } else {
    setTimeout(function() {
      npcMove();
    }, 100);
  }
}
