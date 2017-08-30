import React from "react";
import ReactDOM from "react-dom";
import IndexHandler from "./index_handler";

describe('handler:: Index', () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const div = document.createElement('div');

            ReactDOM.render(<IndexHandler/>, div);
        });
    });
});
