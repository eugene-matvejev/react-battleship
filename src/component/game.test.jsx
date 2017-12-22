import React from "react";
import { shallow } from "enzyme";
import { Game } from "./";
import { generateGame } from "../service/generator";

describe(`component:: <Game/>`, () => {
    describe('::render', () => {
        it('- renders without error', () => {
            const model = generateGame(1, 1);

            shallow(<Game model={model}/>);
        });
    });
});
