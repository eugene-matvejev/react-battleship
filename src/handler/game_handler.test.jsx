import React from 'react';
import { shallow } from 'enzyme';
import { generateGame } from '../service/generator';
import GameHandler from './game_handler';

describe(`<GameHandler/>`, () => {
    describe(`::render`, () => {
        it(' - renders without error', () => {
            const model = generateGame(2, 1); /* two players */

            shallow(<GameHandler model={model} />);
        });
    });
});
