import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureGenericInput } from './generic-input';

configure({ adapter: new Adapter() });

describe('<GenericInput/>', () => {
    const props = {
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<PureGenericInput {...props} />);

            expect(c).toMatchSnapshot();
        });
    });
});
