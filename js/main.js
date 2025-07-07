const board = document.getElementById("board");
const statusText = document.getElementById("status");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let scoreX = 0;
let scoreO = 0;

function drawBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    if (cell) div.classList.add(cell);
    div.addEventListener("click", () => makeMove(index));
    board.appendChild(div);
  });
}

function makeMove(index) {
  if (gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  if (checkWinner()) {
    statusText.textContent = `🎉 اللاعب ${currentPlayer} فاز!`;
    updateScore(currentPlayer);
    disableBoard();
    return;
  } else if (!gameState.includes("")) {
    statusText.textContent = "تعادل! 😅";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  drawBoard();
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    scoreXElement.textContent = scoreX;
  } else {
    scoreO++;
    scoreOElement.textContent = scoreO;
  }
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.style.pointerEvents = "none";
  });
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function restartGame() {
  gameState = Array(9).fill("");
  currentPlayer = "X";
  statusText.textContent = "";
  drawBoard();
}

drawBoard();
