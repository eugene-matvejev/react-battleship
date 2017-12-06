import React from 'react';
import { shallow } from 'enzyme';
import { Cell } from './';
import { CellModel } from '../model';

describe(`component:: <Cell/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const model = new CellModel('A1');

            shallow(<Cell model={model} />);
        });
    });
});
