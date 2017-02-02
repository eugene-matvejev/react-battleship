import React from "react";
import ReactDOM from "react-dom";
import Handler from "./index_handler";

describe('index Handler', () => {
    it('renders without error', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Handler/>, div);
    });
});
