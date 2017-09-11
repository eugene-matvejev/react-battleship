import React from "react";
import ReactDOM from "react-dom";
import Pagination from "./pagination";
import {shallow} from "enzyme";

describe(`component:: <Pagination/>`, () => {
    describe(`::render`, () => {
        it(` - renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(<Pagination currentPage={1} totalPages={2}/>, div);
        });


        describe(`::propTypes`, () => {
            it(` - pageChangeCallback`, () => {
                let expectedPageNumber = 0;
                const pageChangeCallback = (pageNumber) => {
                    expectedPageNumber = pageNumber;
                };

                const el = shallow(<Pagination
                    currentPage={1}
                    totalPages={2}
                    pageChangeCallback={pageChangeCallback}/>);

                el.find('.next').simulate('click');

                expect(expectedPageNumber).toBe(2);
            });
        });
    });
});
