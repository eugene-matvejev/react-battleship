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


        /** functionality relay on data-section attribute */
        describe('::onCollapse', () => {
            it('should mutate state field [::config] and toggle [::isCollapsed] field for relevant section, from click on <Accordion/>', () => {
                const c = shallow(<TreeWalker {...props} />);

                c.find('[data-section][data-cy="section-0"]').simulate('collapse', e);

                expect(c.state('config')).toMatchSnapshot();
            });
        });

        /** functionality relay on data-section and data-field attributes */
        describe('::onChange', () => {
            it('should invoke external callback [::onFilter] with relevant payload from a change event of [data-cy="tree-pattern"]', () => {
                const spy = jest.fn();
                const c = shallow(<FormHandler {...props} validate={spy} />);

                c.find('[tree-pattern"]').simulate('change', e);

                expect(spy).toBeCalledWith(c.state('config'), [[0, 0]]);
            });
        });
    });
});
