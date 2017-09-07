import React from "react";
import ReactDOM from "react-dom";
import GameResultsHandler from "./game_results_handler";

describe(`handler:: <GameResultsHandler/>`, () => {
    describe(`::render`, () => {
        it(`- renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(<GameResultsHandler/>, div);
        });
    })
});
