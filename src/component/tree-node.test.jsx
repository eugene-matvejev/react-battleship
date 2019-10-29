import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TreeNode from './tree-node';

configure({ adapter: new Adapter() });

describe('<TreeNode/>', () => {
    const props = {
        text: '{{text}}',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<TreeNode {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'],
                [
                    'chunks',
                    [
                        { v: 'a', isMatch: true },
                        { v: 'b', isMatch: false },
                        { v: 'c' },
                    ],
                ],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<TreeNode {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });

            describe('prop combinations', () => {
                [
                    [
                        'collapsed with nodes',
                        [
                            ['isExpanded', false],
                            ['nodes', [{ text: '{{node-text}}' }]],
                        ],
                    ],
                    [
                        'expanded with NO nodes',
                        [
                            ['isExpanded', true],
                            ['nodes', []],
                        ],
                    ],
                    [
                        'expanded with "hidden" nodes',
                        [
                            ['isExpanded', true],
                            ['nodes', [{ text: '{{node-text}}' }]],
                        ],
                    ],
                    [
                        'expanded with "visible" nodes',
                        [
                            ['isExpanded', true],
                            ['nodes', [{ text: '{{node-text}}', isVisible: true }]],
                        ],
                    ],
                ].forEach(([desc, v]) => {
                    it(`::${v.map(([p]) => p).join(', ::')} - ${desc}`, () => {
                        const c = shallow(<TreeNode
                            {...props}
                            {...v.reduce((acc, [prop, v]) => (acc[prop] = v, acc), {})}
                        />);

                        expect(c).toMatchSnapshot();
                    });
                });
            });
        });
    });
});
