import React from "react";
import {shallow} from "enzyme";
import Game from "./game";
import GameGenerator from "../service/generator/game_generator";

describe(`component:: <Game/>`, () => {
    describe('::render', () => {
        it('- renders without error', () => {
            const model = GameGenerator.generate(1, 1);

            shallow(<Game model={model}/>);
        });
    });
});
