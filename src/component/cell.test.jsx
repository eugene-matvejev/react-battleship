import React from "react";
import ReactDOM from "react-dom";
import Cell from "./cell";
import CellModel from "../model/cell_model";

describe(`component:: <Cell/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const model = new CellModel('A1');
            const div = document.createElement('div');

            ReactDOM.render(<Cell model={model}/>, div);
        });
    });
});
