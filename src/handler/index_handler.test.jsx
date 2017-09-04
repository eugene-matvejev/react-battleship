import React from "react";
import ReactDOM from "react-dom";
import IndexHandler from "./index_handler";
import {shallow} from "enzyme";

describe(`handler:: <IndexHandler/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const div = document.createElement('div');

            ReactDOM.render(<IndexHandler size={1} opponents={1}/>, div);
        });
    });

    describe(`::slider`, () => {
        const el = shallow(<IndexHandler size={1} opponents={1}/>);

        el.find('Slider[min=1]').simulate('change', 2);

        expect(el.find('.battlefield-cells').children()).toBe(3);
    });
});
