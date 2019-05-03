import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { generateGame } from '../service/generator';
import GameHandler from './game_handler';

configure({ adapter: new Adapter() });

describe(`<GameHandler/>`, () => {
    const model = generateGame(2, 1); /* two players */

    describe(`render`, () => {
        it('with default/required props', () => {
            shallow(<GameHandler model={model} />);
        });
    });
});
