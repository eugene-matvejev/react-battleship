import React from "react";
import ReactDOM from "react-dom";
import IndexHandler from "./index_handler";
import {shallow} from "enzyme";
import parameters from "../parameters.json";

describe(`handler:: <IndexHandler/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const div = document.createElement('div');

            ReactDOM.render(<IndexHandler size={1} opponents={1}/>, div);
        });
    });

    describe(`::slider`, () => {
        it(` - should generate & render additional battlefield as opponents changed from 1 to 2`, () => {
            const el = shallow(<IndexHandler size={1} opponents={1}/>);

            el.find('Slider[min=1]').simulate('change', 2);

            expect(el.find('Game').prop('model').battlefields.length).toBe(3);
        });

        it(` - should generate & render additional cells as game size changed from 1 to 2`, () => {
            const el = shallow(<IndexHandler size={1} opponents={1}/>);

            el.find(`Slider[min=${parameters.minGameSize}]`).simulate('change', parameters.maxGameSize);

            const expected = parameters.maxGameSize ** 2;
            const cells = el.find('Game').prop('model').battlefields[0].cells;

            expect(Object.keys(cells).length).toBe(expected);
        });
    });
});
