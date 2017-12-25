import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationHandler } from './';

configure({ adapter: new Adapter() });

describe(`<NavigationHandler/>`, () => {
    const props = {
        routes: [
            { path: '/1', label: 'label1' },
            { path: '/2', label: 'label2' },
        ],
    };

    describe(`::render`, () => {
        it(`renders without crash`, () => {
            shallow(<NavigationHandler {...props}/>);
        });

        describe(`::onClick`, () => {
            it(`onClick [.btn.btn-close] state: hidden toggled`, () => {
                const el = shallow(<NavigationHandler {...props} hiddenOnMount={false} />);

                el.find('.btn.btn-close').simulate('click');
                const state = el.state();

                expect(state.hidden).toBe(true);
            });

            it(`onClick [.btn.btn-close] onToggle callback works`, () => {
                let toggled = false;
                const onToggle = () => {
                    toggled = !toggled;
                };

                const el = shallow(<NavigationHandler {...props} onToggle={onToggle} />);

                el.find('.btn.btn-close').simulate('click');

                expect(toggled).toBe(true);
            });
        });
    });
});
