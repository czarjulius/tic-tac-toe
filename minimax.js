// MiniMax Algorithm
function getBestMove(board, player) {
  if (
    checkBoard(board) ||
    checkStatus(NPC, board) ||
    checkStatus(USER, board)
  ) {
    return { score: score(board) };
  }
  var clone = board.slice(0),
    moves = [],
    active;
  if (player == NPC) {
    active = USER;
  } else {
    active = NPC;
  }

  for (var i = 0; i < board.length; i++) {
    if (board[i] == " ") {
      var move = { index: i, score: 0 },
        next;
      clone[i] = player;
      next = getBestMove(clone, active);
      move.score = next.score;
      moves.push(move);
      clone[i] = " ";
    }
  }

  if (player == NPC) {
    var best = moves[0];
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > best.score) {
        best = moves[i];
      }
    }
  } else if (player == USER) {
    var best = moves[0];
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < best.score) {
        best = moves[i];
      }
    }
  }
  return best;
}
