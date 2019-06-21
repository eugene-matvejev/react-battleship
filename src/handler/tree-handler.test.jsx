import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TreeHandler from './tree-handler';

configure({ adapter: new Adapter() });

describe('<TreeHandler/>', () => {
    const data = [
        {
            text: 'root',
            nodes: [
                {
                    text: 'children',
                }
            ]
        }
    ];
    const props = {
        onFilter: jest.fn(),
        onExpand: jest.fn(),
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<TreeHandler {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['title', '{{title}}'],
                ['data-cy', '{{data-cy}}'],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<TreeHandler {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('lifecycle events', () => {
        describe('::componentDidMount', () => {
            it('should invoke external callback [::onMount]', () => {
                const spy = jest.fn();

                const c = shallow(<TreeHandler {...props} onMount={spy} />);

                expect(spy).toBeCalledWith(c.instance().props, c.state(), c.instance().onSuccess, c.instance().onError);
            });
        });
    });

    describe('internal callbacks', () => {
        describe('::onSuccess', () => {
            it('should set state fields [::data] from payload', () => {
                const spy = spyOn(TreeHandler.prototype, 'setState');

                shallow(<TreeHandler {...props} />).instance().onSuccess({ data });

                expect(spy).toBeCalledWith({ data });
            });

            it('should invoke external callback [::onSuccess]', () => {
                const spy = jest.fn();

                const c = shallow(<TreeHandler {...props} onSuccess={spy} />);
                c.instance().onSuccess({ data });

                expect(spy).toBeCalledWith(c.instance().props, c.state());
            });
        });

        describe('::onError', () => {
            it('should set state field ::data to empty array', () => {
                const spy = spyOn(TreeHandler.prototype, 'setState');

                shallow(<TreeHandler {...props} />).instance().onError();

                expect(spy).toBeCalledWith({ data: [] });
            });

            it('should invoke external callback [::onError]', () => {
                const spy = jest.fn();

                const c = shallow(<TreeHandler {...props} onError={spy} />);
                c.instance().onError({ data });

                expect(spy).toBeCalledWith(c.instance().props, c.state());
            });
        });

        /** functionality relay on data-node attribute */
        describe('::onExpand', () => {
            it('should invoke external callback [::onExpand] with [::data] state field and value of ["data-node"] from on a click on [data-cy="tree-node-0"]', () => {
                const spy = jest.fn();
                const c = mount(<TreeHandler {...props} data={data} onExpand={spy} />);

                c.find('TreeNode[data-cy="tree-node-0"]').simulate('click');

                expect(spy).toBeCalledWith(c.state('data'), '0');
            });

            it('should invoke external callback [::onExpand] with path from ["data-node"] and [::data] state field', () => {
                const spy = jest.fn();
                const c = mount(<TreeHandler {...props} data={data} onExpand={spy} />);

                c.find('section').simulate('click');

                expect(spy).not.toBeCalled();
            });
        });

        /** functionality relay on data-section and data-field attributes */
        describe('::onChange', () => {
            it('should invoke external callback [::onFilter] with relevant payload from a change event of [data-cy="tree-pattern"]', () => {
                const spy = jest.fn();
                const c = mount(<TreeHandler {...props} data={data} onFilter={spy} />);

                c.find('[data-cy="tree-pattern"]').simulate('change', { target: { value: 'val' } });

                expect(spy).toBeCalledWith(c.state('data'), 'val');
            });
        });
    });
});
