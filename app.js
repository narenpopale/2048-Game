let tiles = document.querySelectorAll(".box");
let newGame = document.querySelector("#new-game");


// Game Board
let board = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1]
];


const generateRandNum = (num) => {
    let number = Math.floor(Math.random() * num);
    return number;
}

const putInitialNumber = () => {
    let x = generateRandNum(4);
    let y = generateRandNum(4);
    board[x][y] = 2;
}

newGame.addEventListener("click", () => {
    putInitialNumber();
    putInitialNumber();
    console.log(board);
})


const updateBoard = (key) => {

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


document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if(event.key == "ArrowLeft") {
        updateBoard();
        console.log(board);
    }
})