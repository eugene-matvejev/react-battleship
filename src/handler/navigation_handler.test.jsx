import React from "react";
import ReactDOM from "react-dom";
import NavigationHandler from "./navigation_handler";
import {BrowserRouter} from "react-router-dom";

describe(`handler:: <NavigationHandler/>`, () => {
    describe(`::render`, () => {
        it(`- renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(
                <BrowserRouter>
                    <NavigationHandler/>
                </BrowserRouter>,
                div
            );
        })
    })
});
