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
        it('if button.btn-submit been clicked handler will be called with expected payload', () => {
            const changedProps = Object.assign({}, props);
            let expectedPayload;

            changedProps.callback = (payload, onSuccess, onFail) => Promise
                .resolve(true)
                .then(() => { expectedPayload = payload; });

            const component = shallow(<AuthHandler {...changedProps} />);
            component.find('button.btn-submit').simulate('click');

            Promise
                .resolve(component)
                .then((c) => c.update())
                .then(() => expect(expectedPayload).toEqual({username: '', password: ''}));
        });
    });

    describe('async update', () => {
        [
            {successful: true, desc: 'success'},
            {successful: false, desc: 'fail'},
        ].forEach(({successful, desc}) => {
            it(`on${desc[0].toUpperCase() + desc.slice(1)}`, () => {
                const changedProps = Object.assign({}, props);

                changedProps.callback = (payload, onSuccess, onFail) => Promise
                    .resolve(true)
                    .then(() => successful ? onSuccess(payload) : onFail(payload))

                const component = shallow(<AuthHandler {...changedProps} />);
                component.find('button.btn-submit').simulate('click');

                Promise
                    .resolve(component)
                    .then((c) => c.update())
                    .then((c) => expect(c.state().color).toBe(successful ? 'green' : 'red'));
            });
        });
    });
});
