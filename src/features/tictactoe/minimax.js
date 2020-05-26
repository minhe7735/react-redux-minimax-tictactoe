import { updateCellAndCheckWinner } from "./tictactoeSlice";

export const bestMove = (board, computer, playerOne) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        const newBoard = [...board];
        if (newBoard[i] === "") {
            //computer tries an empty spot
            newBoard[i] = computer;
            //simulate players move
            let score = minimax(newBoard, playerOne, 0, playerOne, computer);
            //pick the spot which player score is the highest
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return updateCellAndCheckWinner(move);
};

export const minimax = (board, player, depth, playerOne, computer) => {
    const gameState = checkWinner(board, computer, playerOne);
    switch (gameState) {
        case null:
            if (player === computer) {
                //maximize player
                let bestScore = -Infinity;
                for (let i = 0; i < 9; i++) {
                    const newBoard = [...board];
                    if (newBoard[i] === "") {
                        newBoard[i] = computer;
                        let score = minimax(
                            newBoard,
                            playerOne,
                            depth + 1,
                            playerOne,
                            computer
                        );
                        //get highest score
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            } else {
                //minimize computer
                let bestScore = Infinity;
                for (let i = 0; i < 9; i++) {
                    const newBoard = [...board];
                    if (newBoard[i] === "") {
                        newBoard[i] = playerOne;
                        let score = minimax(
                            newBoard,
                            computer,
                            depth + 1,
                            playerOne,
                            computer
                        );
                        //get lowest score
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }
        case `${playerOne} Won`:
            return depth - 10;
        case `${computer} Won`:
            return 10 - depth;
        case "Tie Game":
            return 0;
    }
};

const win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

//check winner
const checkWinner = (board, computer, playerOne) => {
    const emptySpot = board.filter((ele) => ele === "").length;
    for (let combo of win) {
        let count = 0;
        for (let letter of combo) {
            if (board[letter - 1] === computer) {
                count++;
            } else if (board[letter - 1] === playerOne) {
                count--;
            }
        }
        if (count === 3) {
            return `${computer} Won`;
        } else if (count === -3) {
            return `${playerOne} Won`;
        } else if (emptySpot === 0) {
            return "Tie Game";
        }
    }
    return null;
};
