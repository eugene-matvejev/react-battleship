import React from "react";
import { shallow } from "enzyme";
import { Pagination } from "./";

describe(`component:: <Pagination/>`, () => {
    describe(`::render`, () => {
        it(`renders without crash`, () => {
            shallow(<Pagination currentPage={1} totalPages={1} onClickCallback={() => {}}/>);
        });

        describe(`::onClickCallback`, () => {
            [
                {className: 'next', current: 1, total: 1, expected: 1}, /** expected callback not to be called */
                {className: 'next', current: 1, total: 2, expected: 2},
                {className: 'next', current: 2, total: 2, expected: 2}, /** expected callback not to be called */
                {className: 'prev', current: 1, total: 1, expected: 1}, /** expected callback not to be called */
                {className: 'prev', current: 1, total: 2, expected: 1}, /** expected callback not to be called */
                {className: 'prev', current: 2, total: 2, expected: 1},
            ].forEach((el) => {
                it(`on '.${el.className}' current: ${el.current}, total: ${el.total}, expected: ${el.expected}`, () => {
                    let expectedPageNumber = el.current;
                    const onClickCallback = (v) => {
                        expectedPageNumber = v;
                    };

                    const component = shallow(
                        <Pagination currentPage={el.current} totalPages={el.total} onClickCallback={onClickCallback}/>
                    );

                    component.find(`.${el.className}`).simulate('click');

                    expect(expectedPageNumber).toBe(el.expected);
                });
            });
        });
    });
});
