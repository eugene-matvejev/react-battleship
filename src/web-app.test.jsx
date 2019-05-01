import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _WebApp from './web-app';

const { WrappedComponent: WebApp } = _WebApp;

configure({ adapter: new Adapter() });

describe('<WebApp/>', () => {
    const props = {
        title: '{{title}}',
        authorizedRoutes: [
            {
                c: () => <span className="authorized" />,
                path: '/',
                props: {
                },
            },
        ],
        unauthorizedRoutes: [
            {
                c: () => <span className="unauthorized" />,
                path: '/',
                props: {
                },
            },
        ],
    };
    const user = { email: 'example@example.com' };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<WebApp {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['user', user],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<WebApp {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('internal callbacks', () => {
        describe('::onAuthenticate', () => {
            it('should set state field [::user] from payload', () => {
                const spy = spyOn(WebApp.prototype, 'setState');

                shallow(<WebApp {...props} />).instance().onAuthenticate(user);

                expect(spy).toBeCalledWith({ user });
            });
        });
    });
});
