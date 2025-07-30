const board = [];
let cp = "X";
let gameActive = true;
const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    const boardContainer = document.getElementById("game-board");
    boardContainer.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        board[i] = "";
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        boardContainer.appendChild(cell);
    }
    cp = "X";
    gameActive = true;
    setMessage(`Player ${cp}'s turn`);
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (!gameActive || board[index]) return;

    board[index] = cp;
    e.target.textContent = cp;

    if (checkWin(cp)) {
        setMessage(`🎉 Player ${cp} wins!`);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        setMessage("😊 It's a draw!");
        gameActive = false;
        return;
    }

    cp = cp === "X" ? "O" : "X";
    setMessage(`Player ${cp}'s turn`);
}

function checkWin(player) {
    return wins.some(combo =>
        combo.every(index => board[index] === player)
    );
}

function setMessage(msg) {
    document.getElementById("message").textContent = msg;
}

startGame();