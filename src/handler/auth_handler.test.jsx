import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AuthHandler } from './';

configure({ adapter: new Adapter() });

describe('<AuthHandler/>', () => {
    const props = {
        callback: () => { },
    }

    describe('render', () => {
        it('renders without crash', () => {
            shallow(<AuthHandler {...props} />);
        });
    });

    describe('inputs', () => {
        [{ type: 'password', field: 'password' }, { type: 'text', field: 'username' }].forEach(({ type, field }) => {
            it(`${field} field in state get altered with change`, () => {
                const component = shallow(<AuthHandler {...props} />);

                component.find(`input[type="${type}"]`).simulate('change', { target: { value: field } })

                expect(component.state()[field]).toBe(field);
            });
        });
    });

    describe('buttons', () => {
        it('if button.btn-submit been clicked handler will be called', () => {
            const changedProps = Object.assign({}, props);
            let called = false;

            changedProps.callback = () => {
                return {
                    then() {
                        called = true;
                    }
                }
            };

            const component = shallow(<AuthHandler {...changedProps} />);

            component.find('button.btn-submit').simulate('click');

            expect(called).toBe(true);
        });
    });
});
