import React from "react";
import {shallow, mount} from "enzyme";
import GameResultsHandler from "./game_results_handler";

describe(`handler:: <GameResultsHandler/>`, () => {
    describe(`::render`, () => {
        it(`renders without crash`, () => {
            shallow(<GameResultsHandler/>);
        });
    });

    describe(`::paginationOnClickCallback`, () => {
        describe(` - callback should modify state [currentPage]`, () => {
            [
                {current: 1, total: 2, selector: '.next', expected: 2},
                {current: 2, total: 2, selector: '.prev', expected: 1},
            ].forEach((el) => {
                it(`current: ${el.current}, total: ${el.total}, on: "${el.selector}", expected: ${el.expected}`, () => {
                    const component = mount(<GameResultsHandler currentPage={el.current} totalPages={el.total}/>);

                    component.find(el.selector).simulate('click');

                    expect(component.state().currentPage).toBe(el.expected);
                });
            });
        });
    });

    describe(`::keyDownEventHandler`, () => {
        [
            {current: 1, total: 2, code: 'ArrowRight', expected: 2},
            {current: 2, total: 2, code: 'ArrowLeft', expected: 1},
            {current: 1, total: 2, code: 'unknown', expected: 1},
        ].forEach((el) => {
            it(`current: ${el.current}, total: ${el.total}, on: "${el.code}", expected: ${el.expected}`, () => {
                const component = mount(<GameResultsHandler currentPage={el.current} totalPages={el.total}/>);

                component.simulate('keydown', {code: el.code});

                expect(component.state().currentPage).toBe(el.expected);
                component.unmount();
            });
        });
    });
});
