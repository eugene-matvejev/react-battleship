import React from "react";
import { shallow } from "enzyme";
import { Battlefield } from "./";
import { generateBattlefield } from "../service/generator";

describe(`component:: <Battlefield/>`, () => {
    describe(`::render`, () => {
        [2, 3, 5, 10, 15].forEach(size => {
            const expectedCellsAmount = (size + 1 /** because of 'decoration' cells */) ** 2;
            const model = generateBattlefield(size);

            it(`renders ${expectedCellsAmount} cells for battlefield size: ${size} without error`, () => {
                const component = shallow(<Battlefield model={model}/>);

                expect(component.find('Cell').length).toBe(expectedCellsAmount)
            });
        });
    });
});
