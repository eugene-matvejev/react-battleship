import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './button';

configure({ adapter: new Adapter() });

describe('<Button/>', () => {
    const props = {
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<Button {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<Button {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});
