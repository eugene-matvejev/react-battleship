import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './game';
import { generateGame } from '../../service/generator';

configure({ adapter: new Adapter() });

describe(`<Game/>`, () => {
    describe('::render', () => {
        it('- renders without error', () => {
            const model = generateGame(2, 1);

            shallow(<Game model={model} />);
        });
    });
});
