import React from "react";
import ReactDOM from "react-dom";
import Component from "./cell";

describe('component:: Cell', () => {
    it(`::render`, () => {
        it('- renders without error', () => {
            const div = document.createElement('div');

            ReactDOM.render(<Component/>, div);
        });
    });
});
