import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideNav from './side-nav';

configure({ adapter: new Adapter() });

describe('<SideNav/>', () => {
    const props = {
        title: '{{title}}',
        routes: [
            { to: '/1', label: 'label1', disabled: true },
            { to: '/2', label: 'label2', disabled: false },
        ],
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<SideNav {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
                ['isCollapsed', true],
                ['isCollapsed', false],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<SideNav {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('internal callbacks', () => {
        describe('::onCollapse', () => {
            it('should toggle state field [::isCollapsed] from a click on [data-cy="sidenav-collapse-button"]', () => {
                const spy = spyOn(SideNav.prototype, 'setState');

                const c = shallow(<SideNav {...props}/>);
                c.find('[data-cy="sidenav-collapse-button"]').simulate('click');

                expect(spy).toBeCalledWith({ isCollapsed: !c.state('isCollapsed') });
            });
        });
    });
});
