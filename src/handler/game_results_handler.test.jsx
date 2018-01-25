import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameResultsHandler } from './';

configure({ adapter: new Adapter() });

describe(`<GameResultsHandler/>`, () => {
    describe(`rendering`, () => {
        it(`renders without crash`, () => {
            shallow(<GameResultsHandler />);
        });
    });

    describe(`::paginationOnClickCallback`, () => {
        describe(`callback should modify state [current]`, () => {
            [
                { current: 1, total: 2, selector: '.next', expected: 2 },
                { current: 2, total: 2, selector: '.prev', expected: 1 },
            ].forEach(({ current, total, selector, expected }) => {
                it(`current: ${current}, total: ${total}, on: '${selector}', expected: ${expected}`, () => {
                    const component = mount(<GameResultsHandler current={current} total={total} />);

                    component.find(selector).simulate('click');

                    expect(component.state().current).toBe(expected);
                });
            });
        });
    });

    describe(`::keyDownEventHandler`, () => {
        [
            { current: 1, total: 2, code: 'ArrowRight', expected: 2 },
            { current: 2, total: 2, code: 'ArrowRight', expected: 2 }, /** should not change a page */
            { current: 2, total: 2, code: 'ArrowLeft', expected: 1 },
            { current: 1, total: 2, code: 'ArrowLeft', expected: 1 },  /** should not change a page */
            { current: 1, total: 2, code: 'unknown', expected: 1 },    /** is not binded key */
        ].forEach(({ current, total, code, expected }) => {
            it(`current: ${current}, total: ${total}, on: '${code}', expected: ${expected}`, () => {
                const component = shallow(<GameResultsHandler current={current} total={total} />);

                component.simulate('keydown', { code });

                expect(component.state().current).toBe(expected);
                component.unmount();
            });
        });
    });
});
