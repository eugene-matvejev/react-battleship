import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './game';
import { generateGame } from '../../service/generator';

configure({ adapter: new Adapter() });

describe(`<Game/>`, () => {
    const model = generateGame(2, 1);

    describe(`rendering`, () => {
        it('with default/required props', () => {
            shallow(<Game model={model} />);
        });

        it('match snapshot', () => {
            const c = shallow(<Game model={model} />);

            expect(c).toMatchSnapshot();
        });
    });
});
