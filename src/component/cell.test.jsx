import React from "react";
import ReactDOM from "react-dom";
import Compoment from "./cell";

describe('player component', () => {
    it('renders without error', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Compoment/>, div);
    });
});
