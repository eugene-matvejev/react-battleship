import React from 'react';
import { shallow } from 'enzyme';
import AppKernel from './app_kernel';

describe(`component:: <AppKernel/>`, () => {
    describe('::render', () => {
        it(' - without error', () => {
            shallow(<AppKernel />);
        });
    });
});
