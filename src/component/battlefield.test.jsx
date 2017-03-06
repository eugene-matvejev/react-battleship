import React from "react";
import ReactDOM from "react-dom";
import Compoment from "./battlefield";
import Generator from "../generator/battlefield_generator";

describe('component:: Battlefield', () => {
    it('renders without error', () => {
        const div = document.createElement('div');
        const battlefield = Generator.generate(10);

        ReactDOM.render(<Compoment model={battlefield}/>, div);
    });
});
