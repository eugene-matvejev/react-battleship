import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppKernel from './app_kernel';

configure({ adapter: new Adapter() });

describe(`component:: <AppKernel/>`, () => {
    describe('::render', () => {
        it(' - without error', () => {
            shallow(<AppKernel />);
        });
    });
});
