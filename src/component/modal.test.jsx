import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _Modal from './modal';

const { WrappedComponent: Modal } = _Modal;

configure({ adapter: new Adapter() });

describe('<Modal/>', () => {
    const props = {
        history: {
            goBack: jest.fn(),
        },
        title: '{{label}}',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<Modal {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
                ['children', '{{children}}'], /** should be passed 'as is' */
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<Modal {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('external callbacks', () => {
        describe('::history.goBack', () => {
            it('should be invoked from a click on a [data-cy="modal-close"]', () => {
                shallow(<Modal {...props} />).find('[data-cy="modal-close"]').simulate('click');

                expect(props.history.goBack).toBeCalled();
            });
        });
    });
});
