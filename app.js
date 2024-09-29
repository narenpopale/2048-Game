let tiles = document.querySelectorAll(".box");
let newGame = document.querySelector("#new-game");


// Game Board
let board = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1]
];


const btnDisable = () => {
    newGame.disabled = true;
    newGame.style.opacity = "0.5";
    newGame.style.cursor = "not-allowed";
}


// Start New Game
const startNewGame = () => {
    board = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]
    ];
    btnDisable();
}


const generateRandNum = (num) => {
    let number = Math.floor(Math.random() * num);
    return number;
}

const putInitialNumber = () => {
    let x = generateRandNum(4);
    let y = generateRandNum(4);
    board[x][y] = 2;
}

const countEmptyTiles = () => {
    let cnt = 0;

    for(let arr of board) {
        for(let num of arr) {
            if(num == -1) cnt++;
        }
    }

    return cnt;
}

const putNewNumber = () => {
    let count = countEmptyTiles();
    let randNum = generateRandNum(count) + 1;

    for(let i = 0;i < 4; i++) {
        for(let j = 0;j < 4; j++) {
            if(board[i][j] == -1) {
                randNum--;
            }
            if(randNum == 0) {
                board[i][j] = 2;
                randNum--;
            }
        }
    }
}


// Update Actual Board
const updateActualBoard = () => {
    putNumbersOnBoard();
    putColorsOnBoard();
}


const putNumbersOnBoard = () => {
    let index = 0;
    for(let arr of board) {
        for(let val of arr) {
            if(val != -1) tiles[index].innerText = val;
            else tiles[index].innerText = "";
            index++;
        }
    }
}


const putColorsOnBoard = () => {
    for(let val of tiles) {
        let num = val.innerText;
        if(num == 2 || num == 4) val.setAttribute("id", "_24");
        else if(num !== "") {
            val.setAttribute("id", `_${num}`)
        }
        else {
            val.removeAttribute("id");
        }
    }
}


newGame.addEventListener("click", () => {
    startNewGame();
    putInitialNumber();
    putInitialNumber();
    updateActualBoard();
    console.log(board);
})


const updateBoardLeft = () => {

    for(let r = 0;r < 4; r++) {
        let prev = 0;
        for(let c = 1;c < 4; c++) {
            if(board[r][c] == -1) continue;
            if(board[r][prev] == board[r][c]) {
                board[r][prev] *= 2;
                board[r][c] = -1;
                prev++;
            }
            else if(board[r][prev] == -1) {
                board[r][prev] = board[r][c];
                board[r][c] = -1;
            }
            else {
                prev++;
                board[r][prev] = board[r][c];
                if(prev != c) board[r][c] = -1;
            }
        }
    }

}


const updateBoardRight = () => {

    for(let r = 0;r < 4; r++) {
        let prev = 3;
        for(let c = 2;c >= 0; c--) {
            if(board[r][c] == -1) continue;
            if(board[r][prev] == board[r][c]) {
                board[r][prev] *= 2;
                board[r][c] = -1;
                prev--;
            }
            else if(board[r][prev] == -1) {
                board[r][prev] = board[r][c];
                board[r][c] = -1;
            }
            else {
                prev--;
                board[r][prev] = board[r][c];
                if(prev != c) board[r][c] = -1;
            }
        }
    }

}


const updateBoardUp = () => {

    for(let c = 0;c < 4; c++) {
        let prev = 0;
        for(let r = 1;r < 4; r++) {
            if(board[r][c] == -1) continue;
            if(board[prev][c] == board[r][c]) {
                board[prev][c] *= 2;
                board[r][c] = -1;
                prev++;
            }
            else if(board[prev][c] == -1) {
                board[prev][c] = board[r][c];
                board[r][c] = -1;
            }
            else {
                prev++;
                board[prev][c] = board[r][c];
                if(prev != r) board[r][c] = -1;
            }
        }
    }

}


const updateBoardDown = () => {

    for(let c = 0;c < 4; c++) {
        let prev = 3;
        for(let r = 2;r >= 0; r--) {
            if(board[r][c] == -1) continue;
            if(board[prev][c] == board[r][c]) {
                board[prev][c] *= 2;
                board[r][c] = -1;
                prev--;
            }
            else if(board[prev][c] == -1) {
                board[prev][c] = board[r][c];
                board[r][c] = -1;
            }
            else {
                prev--;
                board[prev][c] = board[r][c];
                if(prev != r) board[r][c] = -1;
            }
        }
    }

}


const updateBoard = (key) => {

    if(key === "ArrowLeft") {
        updateBoardLeft();
    }
    if(key === "ArrowRight") {
        updateBoardRight();
    }
    if(key === "ArrowUp") {
        updateBoardUp();
    }
    if(key === "ArrowDown") {
        updateBoardDown();
    }
    console.log(board);
}


document.addEventListener("keydown", (event) => {
    updateBoard(event.key);
    putNewNumber();
    updateActualBoard();
})