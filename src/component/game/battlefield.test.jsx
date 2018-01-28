import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Battlefield } from '../';
import { generateBattlefield } from '../../service/generator';

configure({ adapter: new Adapter() });

describe(`<Battlefield/>`, () => {
    describe(`rendering`, () => {
        [2, 3, 5, 10, 15].forEach((size) => {
            const expectedCellsAmount = (size + 1 /** because of 'decoration' cells */) ** 2;
            const model = generateBattlefield(size);

            it(`renders ${expectedCellsAmount} cells for battlefield size: ${size} without error`, () => {
                const component = shallow(<Battlefield model={model} />);

                expect(component.find('Cell').length).toBe(expectedCellsAmount)
            });
        });
    });
});
