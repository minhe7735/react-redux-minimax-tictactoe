import React from "react";
import { Tictactoe } from "./features/tictactoe/Tictactoe";

function App() {
    return (
        <div className="App w-screen h-screen flex justify-center items-center">
            <header className="App-header">
                <Tictactoe />
            </header>
        </div>
    );
}

export default App;
