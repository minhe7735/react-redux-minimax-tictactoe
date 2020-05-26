import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectPlayerOne,
    selectPlayerTwo,
    selectComputer,
    updateCellAndCheckWinner,
    selectTurn,
    symbolUpdate,
    playSytleUpdate,
    reset,
    selectBoard,
    selectWinner,
    selectPlayStyle,
} from "./tictactoeSlice";
import { bestMove } from "./minimax";
export function Tictactoe() {
    const playerOne = useSelector(selectPlayerOne);
    const playerTwo = useSelector(selectPlayerTwo);
    const playStyle = useSelector(selectPlayStyle);
    const computer = useSelector(selectComputer);
    const winner = useSelector(selectWinner);
    const turn = useSelector(selectTurn);
    const board = useSelector(selectBoard);
    const dispatch = useDispatch();

    useEffect(() => {
        if (playStyle === "computer" && turn === computer) {
            dispatch(bestMove(board, computer, playerOne, turn));
        }
    }, [turn, board]);

    return (
        <div>
            <div className="text-6xl flex justify-center">{winner}</div>
            {!turn ? (
                <div>
                    <div>
                        <div className="flex justify-center">
                            How would you like to play?
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(playSytleUpdate("computer"));
                                }}
                                className="m-2 p-2 bg-green-300 h-10 hover:opacity-50"
                            >
                                vs BOT
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(playSytleUpdate("playerTwo"));
                                }}
                                className="m-2 p-2 bg-green-300 h-10 hover:opacity-50"
                            >
                                vs HUMAN
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            Would you like to be X or O?
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(symbolUpdate("X"));
                                }}
                                className="m-2 p-2 bg-green-300 w-10 h-10 hover:opacity-50"
                            >
                                X
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(symbolUpdate("O"));
                                }}
                                className="m-2 p-2 bg-green-300 w-10 h-10 hover:opacity-50"
                            >
                                O
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-center">
                        <span className="text-4xl">{turn}</span>'s turn
                    </div>
                    <div className="grid grid-cols-3 grid-rows-3 w-64 h-64">
                        {board.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(
                                            updateCellAndCheckWinner(index)
                                        );
                                    }}
                                    className="bg-blue-300 hover:opacity-50 w-20 h-20 flex justify-center items-center text-5xl"
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center ">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(reset());
                            }}
                            className="p-2 bg-red-300 hover:opacity-50 m-2"
                        >
                            RESET BOARD
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(reset("reset all"));
                            }}
                            className="p-2 bg-red-300 hover:opacity-50 m-2"
                        >
                            RESET ALL
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
