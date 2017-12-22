import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationHandler } from './';

configure({ adapter: new Adapter() });

describe(`<NavigationHandler/>`, () => {
    describe(`::render`, () => {
        it(`renders without crash`, () => {
            shallow(<NavigationHandler />);
        });

        describe(`::onClick`, () => {
            it(`onClick [.btn.btn-close] state: hidden toggled`, () => {
                const el = shallow(<NavigationHandler hiddenOnMount={false} />);

                el.find('.btn.btn-close').simulate('click');
                const state = el.state();

                expect(state.hidden).toBe(true);
            });

            it(`onClick [.btn.btn-close] onToggle callback works`, () => {
                let toggled = false;
                const onToggle = () => {
                    toggled = !toggled;
                };

                const el = shallow(<NavigationHandler onToggle={onToggle} />);

                el.find('.btn.btn-close').simulate('click');

                expect(toggled).toBe(true);
            });
        });
    });
});
