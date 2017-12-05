import React from 'react';
import { shallow } from 'enzyme';
import { GameInitiationHandler } from './';

describe(`handler:: <GameInitiationHandler/>`, () => {
    const defaultProps = {
        minSize: 1,
        maxSize: 2,
        minOpponents: 3,
        maxOpponents: 4,
        onSubmit: () => { }
    };

    const { minSize, maxSize, minOpponents, maxOpponents } = defaultProps;

    describe(`render`, () => {
        it(`it renders without crash`, () => {
            shallow(<GameInitiationHandler {...defaultProps} />);
        });
    });

    describe(`::slider`, () => {
        it(`should generate & render additional battlefield as opponents changed from ${minOpponents} to ${maxOpponents}`, () => {
            const component = shallow(<GameInitiationHandler {...defaultProps} />);
            component.find(`Slider[min=${minOpponents}]`).simulate('change', maxOpponents);

            expect(component.state('opponents')).toBe(maxOpponents);
        });

        it(`should generate & render additional cells as game size changed from ${minSize} to ${maxSize}`, () => {
            const component = shallow(<GameInitiationHandler {...defaultProps} />);
            component.find(`Slider[min=${minSize}]`).simulate('change', maxSize);

            const expected = maxSize ** 2;
            const cells = component.find('Battlefield').prop('model').cellsIndexedByCoordinate;

            expect(Object.keys(cells).length).toBe(expected);
        });
    });
});
