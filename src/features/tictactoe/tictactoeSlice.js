import { createSlice } from "@reduxjs/toolkit";

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

export const tictactoeSlice = createSlice({
    name: "tictactoe",
    initialState: {
        playerOne: "",
        playerTwo: "",
        computer: "",
        board: Array(9).fill(""),
        turn: "",
        playStyle: "",
        started: false,
        winner: null,
        emptySpot: 9,
    },
    reducers: {
        cellUpdate: (state, action) => {
            if (
                !state.board[action.payload] &&
                !state.winner &&
                state.turn &&
                state.playStyle
            ) {
                state.board[action.payload] = state.turn;
                state.turn === "X" ? (state.turn = "O") : (state.turn = "X");
                state.emptySpot--;
                state.started = true;
            }
        },
        symbolUpdate: (state, action) => {
            if (!state.started) {
                if (action.payload === "X") {
                    state.playerOne = "X";
                    state[state.playStyle] = "O";
                } else {
                    state.playerOne = "O";
                    state[state.playStyle] = "X";
                }
                Math.floor(Math.random() * 2) === 0
                    ? (state.turn = state.playerOne)
                    : (state.turn = state[state.playStyle]);
            }
        },
        playSytleUpdate: (state, action) => {
            if (!state.started) {
                state.playStyle = action.payload;
            }
        },
        updateWinner: (state) => {
            for (let combo of win) {
                let count = 0;
                for (let letter of combo) {
                    if (state.board[letter - 1] === "X") {
                        count++;
                    } else if (state.board[letter - 1] === "O") {
                        count--;
                    }
                }
                if (count === 3) {
                    state.winner = "X Won";
                } else if (count === -3) {
                    state.winner = "O Won";
                } else if (state.emptySpot === 0) {
                    state.winner = "Tie Game";
                }
            }
        },
        reset: (state, action) => {
            state.board = Array(9).fill("");
            state.winner = null;
            state.emptySpot = 9;
            if (Math.floor(Math.random() * 2) === 0) {
                state.turn = "X";
            } else {
                state.turn = "O";
            }

            if (action.payload) {
                state.playStyle = "";
                state.turn = "";
                state.started = false;
            }
        },
    },
});

export const {
    cellUpdate,
    symbolUpdate,
    playSytleUpdate,
    reset,
    updateWinner,
} = tictactoeSlice.actions;

export const updateCellAndCheckWinner = (index) => (dispatch) => {
    dispatch(cellUpdate(index));
    dispatch(updateWinner());
};

export const selectPlayerOne = (state) => state.tictactoe.playerOne;
export const selectPlayerTwo = (state) => state.tictactoe.playerTwo;
export const selectPlayStyle = (state) => state.tictactoe.playStyle;
export const selectComputer = (state) => state.tictactoe.computer;
export const selectTurn = (state) => state.tictactoe.turn;
export const selectBoard = (state) => state.tictactoe.board;
export const selectWinner = (state) => state.tictactoe.winner;

export default tictactoeSlice.reducer;
