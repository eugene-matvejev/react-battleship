import React from "react";
import ReactDOM from "react-dom";
import IndexHandler from "./index_handler";

describe(`handler:: <IndexHandler/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const div = document.createElement('div');

            ReactDOM.render(<IndexHandler size={1} opponents={1}/>, div);
        });
    });
});
