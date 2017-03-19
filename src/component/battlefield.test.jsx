import React from "react";
import ReactDOM from "react-dom";
import Component from "./battlefield";
import generator from "../generator/battlefield_generator";

describe('component:: Battlefield', () => {
    describe(`::render`, () => {
        [2, 3, 5, 10, 15].forEach(size => {
            const expectedNumberCells = (size + 1 /** because of 'decoration' cells */) ** 2;
            it(` - renders ${expectedNumberCells} cells for battlefield size: ${size} without error`, () => {
                const div = document.createElement('div');
                const battlefield = generator.generate(size);

                ReactDOM.render(<Component model={battlefield}/>, div);

                expect(div.querySelectorAll('.battlefield-cell').length).toBe(expectedNumberCells)
            });
        });
    });
});
