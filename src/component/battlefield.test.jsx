import React from "react";
import ReactDOM from "react-dom";
import Component from "./battlefield";
import generator from "../generator/battlefield_generator";

describe('component:: Battlefield', () => {
    describe(`::render`, () => {
        [2, 3, 5, 10, 15].forEach(size => {
            const expectedCellsAmount = (size + 1 /** because of 'decoration' cells */) ** 2;
            const battlefield = generator.generate(size);

            it(` - renders ${expectedCellsAmount} cells for battlefield size: ${size} without error`, () => {
                const div = document.createElement('div');
                ReactDOM.render(<Component model={battlefield}/>, div);

                expect(div.querySelectorAll('.battlefield-cell').length).toBe(expectedCellsAmount)
            });
        });
    });
});
