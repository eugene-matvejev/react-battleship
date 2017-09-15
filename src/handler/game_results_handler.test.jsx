import React from "react";
import ReactDOM from "react-dom";
import GameResultsHandler from "./game_results_handler";
import {mount} from "enzyme";

describe(`handler:: <GameResultsHandler/>`, () => {
    describe(`::render`, () => {
        it(`- renders without crash`, () => {
            const div = document.createElement('div');

            ReactDOM.render(<GameResultsHandler/>, div);
        });
    });

    describe(`::paginationOnClickCallback`, () => {
        it(` - callback should modify state [currentPage]`, () => {
            const component = mount(<GameResultsHandler currrentPage={1} totalPages={2}/>);

            component.find('.next').simulate('click');

            expect(component.state().currentPage).toBe(2);
        });

        it(` - callback should modify state [currentPage]`, () => {
            const component = mount(<GameResultsHandler currrentPage={1} totalPages={2}/>);

            component.simulate('keydown', {code: 'ArrowRight'});

            expect(component.state().currentPage).toBe(2);
        });
    });
});
