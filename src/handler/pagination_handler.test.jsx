import React from "react";
import ReactDOM from "react-dom";
import PaginationHandler from "./pagination_handler";
import {shallow} from "enzyme";

describe(`component:: <PaginationHandler/>`, () => {
    describe(`::render`, () => {
        it(` - renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(<PaginationHandler currentPage={1} totalPages={2}/>, div);
        });


        describe(`::propTypes`, () => {
            it(` - pageChangeCallback`, () => {
                let called = false;
                let expectedPageNumber = 0;
                const pageChangeCallback = (pageNumber) => {
                    expectedPageNumber = pageNumber;
                    called = !called;
                };

                const el = shallow(<PaginationHandler
                    currentPage={1}
                    totalPages={2}
                    pageChangeCallback={pageChangeCallback}/>);

                el.find('.next').simulate('click');

                expect(expectedPageNumber).toBe(2);
                expect(called).toBe(true);
            });
        });
    });
});
