import React from "react";
import ReactDOM from "react-dom";
import AppKernel from "./app_kernel";

describe('kernel component', () => {
    describe('::render', () => {
        it(' - without error', () => {
            const div = document.createElement('div');

            ReactDOM.render(<AppKernel/>, div);
        });
    })
});
