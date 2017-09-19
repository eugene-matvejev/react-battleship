import React from "react";
import {shallow} from "enzyme";
import Cell from "./cell";
import CellModel from "../model/cell_model";

describe(`component:: <Cell/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const model = new CellModel('A1');

            shallow(<Cell model={model}/>);
        });
    });
});
