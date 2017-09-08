import React from "react";
import ReactDOM from "react-dom";
import PaginationHandler from "./pagination_handler";


describe(`component:: <PaginationHandler/>`, () => {
    describe(`::render`, () => {
        it(` - renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(<PaginationHandler/>, div);
        })
    });
});
