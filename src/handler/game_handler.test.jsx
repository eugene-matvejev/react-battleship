import React from "react";
import { shallow } from "enzyme";
import { GameHandler } from "./";
import parameters from "../parameters.json";

describe(`handler:: <GameHandler/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            shallow(<GameHandler size={1} opponents={1}/>);
        });
    });

    describe(`::slider`, () => {
        it(`should generate & render additional battlefield as opponents changed from 1 to 2`, () => {
            const el = shallow(<GameHandler size={1} opponents={1}/>);

            el.find('Slider[min=1]').simulate('change', 2);

            expect(el.find('Game').prop('model').battlefields.length).toBe(3);
        });

        it(`should generate & render additional cells as game size changed from 1 to 2`, () => {
            const el = shallow(<GameHandler size={1} opponents={1}/>);

            el.find(`Slider[min=${parameters.minGameSize}]`).simulate('change', parameters.maxGameSize);

            const expected = parameters.maxGameSize ** 2;
            const cells = el.find('Game').prop('model').battlefields[0].cellsIndexedByCoordinate;

            expect(Object.keys(cells).length).toBe(expected);
        });
    });
});
