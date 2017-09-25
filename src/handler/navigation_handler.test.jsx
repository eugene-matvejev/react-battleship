import React from "react";
import {shallow} from "enzyme";
import NavigationHandler from "./navigation_handler";

describe(`handler:: <NavigationHandler/>`, () => {
    describe(`::render`, () => {
        it(`renders without crash`, () => {
            shallow(<NavigationHandler/>);
        });

        describe(`::onClick`, () => {
            it(`onClick [.btn.btn-close] state: hidden toggled`, () => {
                const el = shallow(<NavigationHandler hiddenOnMount={false}/>);

                el.find('.btn.btn-close').simulate('click');
                const state = el.state();

                expect(state.hidden).toBe(true);
            });

            it(`onClick [.btn.btn-close] onToggle callback works`, () => {
                let toggled = false;
                const onToggle = () => {
                    toggled = !toggled;
                };

                const el = shallow(<NavigationHandler onToggle={onToggle}/>);

                el.find('.btn.btn-close').simulate('click');

                expect(toggled).toBe(true);
            });
        });
    });
});
