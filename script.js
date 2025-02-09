const board = document.getElementById('board');
const playerXInput = document.getElementById('playerXName');
const playerOInput = document.getElementById('playerOName');
const playerXDisplay = document.getElementById('playerXDisplay');
const playerODisplay = document.getElementById('playerODisplay');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const startGameButton = document.getElementById('startGameButton');
const resetScoreButton = document.getElementById('resetScoreButton');
const turnIndicator = document.getElementById('turnIndicator');
const restartButton = document.getElementById('restartButton');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const cellElements = document.querySelectorAll('[data-cell]');
const gameContainer = document.getElementById('game');

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let scoreX = 0, scoreO = 0, circleTurn;

// Ensure the game starts with everything hidden properly
window.onload = () => {
  gameContainer.classList.add('hidden');  // Hide game container
  winningMessageElement.classList.add('hidden'); // Hide winning message
};

// Start Game Button
startGameButton.addEventListener('click', () => {
  gameContainer.classList.remove('hidden'); // Show game container
  startGame();

  playerXDisplay.innerText = playerXInput.value.trim() || 'Player X';
  playerODisplay.innerText = playerOInput.value.trim() || 'Player O';
});

// Reset Score Button
resetScoreButton.addEventListener('click', () => {
  scoreX = 0;
  scoreO = 0;
  updateScores();
});

// Restart Game Button
restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  updateTurnIndicator();
  winningMessageElement.classList.add('hidden'); // Ensure winning message is hidden

  cellElements.forEach(cell => {
    cell.classList.remove('x', 'circle');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  setBoardHoverClass();
}

// Updates the player turn display
function updateTurnIndicator() {
  turnIndicator.innerText = circleTurn ? `${playerODisplay.innerText}'s Turn` : `${playerXDisplay.innerText}'s Turn`;
}

// Handle Click Event
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? 'circle' : 'x';
  placeMark(cell, currentClass)

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    updateTurnIndicator();
  }
}

// Handle End of Game
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? playerODisplay.innerText : playerXDisplay.innerText} Wins!`;
    
    // Update scores
    if (circleTurn) {
      scoreO++;
    } else {
      scoreX++;
    }
    updateScores();
  }

  winningMessageElement.classList.remove('hidden'); // Show message when game ends
}

// Check for Draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
}

// Place X or O on the Board
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Swap Turns
function swapTurns() {
  circleTurn = !circleTurn;
}

// Update Board Hover Effect
function setBoardHoverClass() {
  board.classList.remove('x', 'circle');
  board.classList.add(circleTurn ? 'circle' : 'x');
}

// Check for Win
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// Update Scores on Screen
function updateScores() {
  scoreXElement.innerText = scoreX;
  scoreOElement.innerText = scoreO;
}
