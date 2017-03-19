import React from "react";
import ReactDOM from "react-dom";
import Component from "./game";
import GameGenerator from "../generator/game_generator";

describe('component:: Game', () => {
    describe('::render', () => {
        it('- renders without error', () => {
            const div = document.createElement('div');
            const model = GameGenerator.generate(1, 1);

            ReactDOM.render(<Component model={model}/>, div);
        });
    });
});
