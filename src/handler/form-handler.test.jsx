import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormHandler from './form-handler';

configure({ adapter: new Adapter() });

describe('<FormHandler/>', () => {
    const props = {
        config: [
            {
                items: [
                    {
                        c: (props) => <span {...props}/>,
                    }
                ]
            }
        ]
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<FormHandler {...props} />);

            expect(c).toMatchSnapshot();
        });
    });
});
