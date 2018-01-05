import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationSideBar } from '../';

configure({ adapter: new Adapter() });

describe(`<NavigationSideBar/>`, () => {
    const props = {
        label: 'label',
        routes: [
            { path: '/1', label: 'label1' },
            { path: '/2', label: 'label2' },
        ],
    };

    describe(`::render`, () => {
        it(`renders without crash`, () => {
            shallow(<NavigationSideBar {...props} />);
        });

        describe(`::onClick [.btn]`, () => {
            describe(`internal state {hidden} get toggled`, () => {
                [true, false].forEach((v) => {
                    it(`inititial: ${v}, expected: ${!v}`, () => {
                        const el = shallow(<NavigationSideBar {...props} hiddenOnMount={v} />);

                        el.find('.btn').at(0).simulate('click');
                        const { hidden } = el.state();

                        expect(hidden).toBe(!v);
                    });
                });
            });

            describe(`onToggle callback`, () => {
                [true, false].forEach((v) => {
                    it(`new value of internal state {hidden} get passed to callback: initial ${v}, expected on callback: ${!v}`, () => {
                        let result = undefined;
                        const onToggle = (v) => {
                            result = v;
                        };

                        const el = shallow(<NavigationSideBar {...props} onToggle={onToggle} hiddenOnMount={v} />);

                        el.find('.btn').at(0).simulate('click');

                        expect(result).toBe(!v);
                    });
                });
            });
        });
    });
});
