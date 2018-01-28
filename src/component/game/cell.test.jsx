import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cell } from '../';
import { CellModel } from '../../model';

configure({ adapter: new Adapter() });

describe(`<Cell/>`, () => {
    const model = new CellModel('A1');

    describe(`rendering`, () => {
        it('with default/required props', () => {
            shallow(<Cell model={model} />);
        });
    });
});
