let statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "O";
let gameState = ["", "", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => 'Game ended in a tie/draw';
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerText = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
    let clickedCell = clickedCellEvent.target;
    let clickedCellIndex = parseInt (
        clickedCell.getAttribute('data-cell-index'))

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
	alert('This cell is already occupied. Please select an empty cell.')
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    }

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

function handleResultValidation() {
    console.log(gameState);
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
    let winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
        continue;
    }
    if (a === b && b === c) {
        roundWon = true;
        break;
    }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "O";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}
