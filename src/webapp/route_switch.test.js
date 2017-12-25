import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RouteSwitch from './route_switch';

configure({ adapter: new Adapter() });

describe(`component:: <RouteSwitch/>`, () => {
    describe('::render', () => {
        it('renders without error', () => {
            shallow(<RouteSwitch config={{}}/>);
        });
    });
});
