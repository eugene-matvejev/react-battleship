import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Pagination } from '../';

configure({ adapter: new Adapter() });

describe(`<Pagination/>`, () => {
    describe(`rendering`, () => {
        it('with default/required props', () => {
            shallow(<Pagination current={1} total={1} onClickCallback={() => { }} />);
        });
    });

    describe(`callbacks`, () => {
        describe(`onClickCallback`, () => {
            [
                { className: 'next', current: 1, total: 1, expected: 1 }, /** expected callback not to be called */
                { className: 'next', current: 1, total: 2, expected: 2 },
                { className: 'next', current: 2, total: 2, expected: 2 }, /** expected callback not to be called */
                { className: 'prev', current: 1, total: 1, expected: 1 }, /** expected callback not to be called */
                { className: 'prev', current: 1, total: 2, expected: 1 }, /** expected callback not to be called */
                { className: 'prev', current: 2, total: 2, expected: 1 },
            ].forEach(({className, current, total, expected}) => {
                it(`on '.${className}' current: ${current}, total: ${total}, expected: ${expected}`, () => {
                    let val = current;

                    const onClickCallback = (v) => {
                        val = v;
                    };
                    const props = { current, total, onClickCallback };
                    const component = shallow(<Pagination {...props} />);

                    component.find(`.${className}`).simulate('click');

                    expect(val).toBe(expected);
                });
            });
        });
    });
});
