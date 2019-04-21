import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormHandler from './form-handler';

configure({ adapter: new Adapter() });

describe('<FormHandler/>', () => {
    const ctrlProps = {
        updateCTRL: {
            label: '{{update}}',
        },
        submitCTRL: {
            label: '{{submit}}',
        },
        cancelCTRL: {
            label: '{{cancel}}',
        },
    };

    const props = {
        config: [
            {
                title: '{{section 0}}',
                items: [
                    {
                        c: (props) => <span {...props} />,
                    }
                ]
            }
        ],
        ...ctrlProps,
    };

    const data = {};

    const e = {
        preventDefault: () => 0,
        stopPropagation: () => 0,
        target: {
            value: '{{value}}',
            getAttribute: () => 0,
        },
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<FormHandler {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['cy', '{{cy}}'],
                ['data', data],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<FormHandler {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('lifecycle events', () => {
        describe('::componentDidMount', () => {
            it('should invoke external callback [::onMount]', () => {
                const spy = jest.fn();

                const c = shallow(<FormHandler {...props} onMount={spy} />);

                expect(spy).toBeCalledWith(c.instance().props, c.state(), c.instance().onSuccess, c.instance().onError);
            });
        });
    });

    describe('internal callbacks', () => {
        describe('::onSuccess', () => {
            it('should set state fields [::config, ::data] from payload', () => {
                const spy = spyOn(FormHandler.prototype, 'setState');

                shallow(<FormHandler {...props} />).instance().onSuccess({ data, config: props.config });

                expect(spy).toBeCalledWith({ data, config: props.config });
            });

            it('should invoke external callback [::onSuccess]', () => {
                const spy = jest.fn();

                const c = shallow(<FormHandler {...props} onSuccess={spy} />);
                c.instance().onSuccess({ data, config: props.config });

                expect(spy).toBeCalledWith(c.instance().props, c.state());
            });
        });

        describe('::onError', () => {
            it('should set state fields [::config, ::data] from payload', () => {
                const spy = spyOn(FormHandler.prototype, 'setState');

                shallow(<FormHandler {...props} />).instance().onError({ data, config: props.config });

                expect(spy).toBeCalledWith({ data, config: props.config });
            });

            it('should invoke external callback [::onError]', () => {
                const spy = jest.fn();

                const c = shallow(<FormHandler {...props} onError={spy} />);
                c.instance().onError({ data, config: props.config });

                expect(spy).toBeCalledWith(c.instance().props, c.state());
            });
        });

        describe('::onSubmit', () => {
            it('should invoke external callback [::onSubmit] from click on [data-cy="form-action-submit"]', () => {
                const spy = jest.fn();
                const c = shallow(<FormHandler {...props} onSubmit={spy} />);

                c.find('Button[data-cy="form-action-submit"]').simulate('click', e);

                expect(spy).toBeCalledWith(c.instance().props, c.state(), c.instance().onSuccess, c.instance().onError);
            });

            it('should invoke external callback [::onSubmit] from click on [data-cy="form-action-update"]', () => {
                const spy = jest.fn();
                const c = shallow(<FormHandler {...props} onSubmit={spy} data={data} />);

                c.find('Button[data-cy="form-action-update"]').simulate('click', e);

                expect(spy).toBeCalledWith(c.instance().props, c.state(), c.instance().onSuccess, c.instance().onError);
            });
        });

        describe('::onCancel', () => {
            it('should invoke external callback [::onCancel] from click on [data-cy="form-action-cancel"]', () => {
                const spy = jest.fn();
                const c = shallow(<FormHandler {...props} onCancel={spy} />);

                c.find('Button[data-cy="form-action-cancel"]').simulate('click', e);

                expect(spy).toBeCalledWith(c.instance().props, c.state(), c.instance().onSuccess, c.instance().onError);
            });
        });

        /** functionality relay on data-section attribute */
        describe('::onCollapse', () => {
            it('should mutate state field [::config] and toggle [::isCollapsed] field for relevant section, from click on <Accordion/>', () => {
                const c = shallow(<FormHandler {...props} />);

                c.find('[data-section][data-cy="section-0"]').simulate('click', e);

                expect(c.state('config')).toMatchSnapshot();
            });
        });

        /** functionality relay on data-section and data-field attributes */
        describe('::onChange', () => {
            it('should invoke external callback [::validate] with relevant payload', () => {
                const spy = jest.fn();
                const c = shallow(<FormHandler {...props} validate={spy} />);

                c.find('[data-section][data-field][data-cy="section-0-input-0"]').simulate('change', e);

                expect(spy).toBeCalledWith(c.state('config'), [[0, 0]]);
            });

            it('should mutate state field [::config] and set [::value] for relevant field from payload', () => {
                const config = [
                    {
                        items: [
                            {
                                c: () => <span />,
                            },
                            {
                                c: () => <span />,
                            },
                        ],
                    },
                ];

                const c = shallow(<FormHandler {...props} config={config} />);

                c.find('[data-section][data-field][data-cy="section-0-input-0"]').simulate('change', e);

                expect(c.state('config')).toMatchSnapshot();
            });

            it('should set state field [::isValid] to FALSE, if there is least one error', () => {
                const spy = spyOn(FormHandler.prototype, 'setState');
                const config = [
                    {
                        items: [
                            {
                                c: () => <span />,
                            },
                            {
                                c: () => <span />,
                                errors: ['error'],
                            },
                        ],
                    },
                ];

                shallow(<FormHandler {...props} config={config} />)
                    .find('[data-section][data-field][data-cy="section-0-input-0"]')
                    .simulate('change', e);

                expect(spy).toBeCalledWith({ config, isValid: false });
            });

            it('should set state field [::isValid] to TRUE, if there are NO errors', () => {
                const spy = spyOn(FormHandler.prototype, 'setState');
                const config = [
                    {
                        items: [
                            {
                                c: () => <span />,
                            },
                            {
                                c: () => <span />,
                            },
                        ],
                    },
                ];

                shallow(<FormHandler {...props} config={config} />)
                    .find('[data-section][data-field][data-cy="section-0-input-0"]')
                    .simulate('change', e);

                expect(spy).toBeCalledWith({ config, isValid: true });
            });
        });
    });
});
