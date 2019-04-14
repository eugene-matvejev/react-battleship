import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import composeInput from './composeInput';

configure({ adapter: new Adapter() });

const ComposedInput = composeInput((props) => <input {...props} />);

describe('<ComposedInput/>', () => {
    const props = {
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<ComposedInput {...props} />);

            expect(c).toMatchSnapshot();
        });
    });
});
