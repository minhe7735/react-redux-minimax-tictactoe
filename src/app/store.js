import { configureStore } from "@reduxjs/toolkit";
import tictactoeReducer from "../features/tictactoe/tictactoeSlice";

export default configureStore({
    reducer: {
        tictactoe: tictactoeReducer,
    },
});
