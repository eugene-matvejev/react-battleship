import React from "react";
import ReactDOM from "react-dom";
import Component from "./game";

describe('component:: Game', () => {
    it('renders without error', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Component/>, div);
    });
});
