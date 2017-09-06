import React from "react";
import ReactDOM from "react-dom";
import NavigationHandler from "./navigation_handler";

describe(`handler:: <NavigationHandler/>`, () => {
    describe(`::render`, () => {
        it(`- renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(<NavigationHandler/>, div);
        })
    })
});
