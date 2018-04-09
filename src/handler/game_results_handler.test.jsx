import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameResultsHandler } from './';

configure({ adapter: new Adapter() });

describe(`<GameResultsHandler/>`, () => {
    const props = {
        current: 1,
        total: 2,
        label: 'test',
        callback: () => { },
    };

    describe(`rendering`, () => {
        it('with default/required props', () => {
            shallow(<GameResultsHandler {...props}/>);
        });
    });

    // describe(`callbacks`, () => {
    //     describe(`paginationOnClickCallback`, () => {
    //         describe(`should modify state [current]`, () => {
    //             [
    //                 { current: 1, total: 2, selector: '.next', expected: 2 },
    //                 { current: 2, total: 2, selector: '.prev', expected: 1 },
    //             ].forEach(({ current, total, selector, expected }) => {
    //                 it(`current: ${current}, total: ${total}, on: '${selector}', expected: ${expected}`, () => {
    //                     const _props = Object.assign(
    //                         {},
    //                         props,
    //                         { current, total },
    //                     );
    //                     const c = mount(<GameResultsHandler {..._props} />);

    //                     c.find(selector).simulate('click');

    //                     expect(c.state().current).toBe(expected);
    //                 });
    //             });
    //         });
    //     });
    // });

    describe(`attached callbacks`, () => {
        describe(`onKeyDown`, () => {
            [
                { current: 1, total: 2, code: 'ArrowRight', toBeCalled: true },
                { current: 2, total: 2, code: 'ArrowRight', toBeCalled: false }, /** current + 1 > total */
                { current: 3, total: 2, code: 'ArrowRight', toBeCalled: false }, /** (current > total) + 1 > total */
                { current: 4, total: 2, code: 'ArrowLeft', toBeCalled: false },  /** current - 1 > total */
                { current: 3, total: 2, code: 'ArrowLeft', toBeCalled: true },
                { current: 2, total: 2, code: 'ArrowLeft', toBeCalled: true },
                { current: 1, total: 2, code: 'ArrowLeft', toBeCalled: false },  /** current - 1 <= 0 */
                { current: 1, total: 2, code: 'unknown', toBeCalled: false },    /** is not binded key */
            ].forEach(({ current, total, code, toBeCalled }) => {
                it(`current: ${current}, total: ${total}, on: '${code}', expected callback ${!toBeCalled ? 'NOT ' : ''}to be called`, () => {
                    const _props = Object.assign(
                        {},
                        props,
                        { current, total, callback: () => { } },
                    );
                    const spy = spyOn(_props, 'callback');
                    const c = shallow(<GameResultsHandler {..._props} />);

                    c.simulate('keydown', { code });

                    toBeCalled
                        ? expect(spy).toBeCalled()
                        : expect(spy).not.toBeCalled();

                    c.unmount();
                });
            });
        });
    });
});
