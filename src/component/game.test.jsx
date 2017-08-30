import React from "react";
import ReactDOM from "react-dom";
import Game from "./game";
import GameGenerator from "../service/generator/game_generator";

describe('component:: Game', () => {
    describe('::render', () => {
        it('- renders without error', () => {
            const div = document.createElement('div');
            const model = GameGenerator.generate(1, 1);

            ReactDOM.render(<Game model={model}/>, div);
        });
    });
});
