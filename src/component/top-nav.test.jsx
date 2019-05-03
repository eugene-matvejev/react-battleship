import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopNav from './top-nav';

configure({ adapter: new Adapter() });

describe('<TopNav/>', () => {
    const props = {
        initials: 'CY',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<TopNav {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<TopNav {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});
