import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AuthHandler } from './';

configure({ adapter: new Adapter() });

describe('<AuthHandler/>', () => {
    const props = {
        label: 'props.label',
        className: 'props.className',
        signUpLink: '/sign-up',
        resetPasswordLink: '/password-reset',
        callback: () => { },
    }

    describe(`render`, () => {
        it('with default/required props', () => {
            shallow(<AuthHandler {...props} />);
        });

        it('match snapshop', () => {
            const c = shallow(<AuthHandler {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('<Link/>', () => {
            [
                { to: props.signUpLink },
                { to: props.resetPasswordLink },
            ].forEach(({ to, type }) => {
                it(`route "${to}" in rendered`, () => {
                    const c = shallow(<AuthHandler {...props} />);

                    const _to = c.find({to}).prop('to');

                    expect(to).toBe(_to);
                });
            });
        });
    });

    describe('inputs', () => {
        [
            { type: 'password', value: 'password' },
            { type: 'text', value: 'username' }
        ].forEach(({ type, value }) => {
            it(`${value} field in state get altered with change`, () => {
                const c = shallow(<AuthHandler {...props} />);

                c.find(`input[type="${type}"]`).simulate('change', { target: { value } })

                expect(c.state()[value]).toBe(value);
            });
        });
    });

    describe('buttons', () => {
        it('if button.btn-submit been clicked handler will be called with expected payload', () => {
            let v;
            const _props = Object.assign(
                {},
                props,
                { callback: (payload) => { v = payload; } }
            );

            const c = shallow(<AuthHandler {..._props} />);
            c.find('button.btn-submit').simulate('click');

            expect(v).toEqual({ username: '', password: '' });
        });
    });
});
