import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TreeNode from './tree-node';

configure({ adapter: new Adapter() });

describe.skip('<TreeNode/>', () => {
    const props = {
        label: '{{label}}',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<TreeNode {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<TreeNode {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});
