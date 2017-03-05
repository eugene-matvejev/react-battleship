import React from "react";
import ReactDOM from "react-dom";
import Compoment from "./cell";

describe('component:: Cell', () => {
    it('renders without error', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Compoment/>, div);
    });
});
