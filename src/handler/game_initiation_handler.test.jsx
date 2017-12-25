import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameInitiationHandler } from './';

configure({ adapter: new Adapter() });

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

    describe(`embedded <Slider/> behaviour`, () => {
        it(`should change opponents from ${minOpponents} to ${maxOpponents}`, () => {
            const component = shallow(<GameInitiationHandler {...defaultProps} />);
            component.find(`Slider`).at(0).simulate('change', maxOpponents);

            expect(component.state('opponents')).toBe(maxOpponents);
        });

        it(`should generate & render additional cells as game size changed from ${minSize} to ${maxSize}`, () => {
            const component = shallow(<GameInitiationHandler {...defaultProps} />);
            component.find(`Slider`).at(1).simulate('change', maxSize);

            const expected = maxSize ** 2;
            const cells = component.find('Battlefield').prop('model').cellsIndexedByCoordinate;

            expect(Object.keys(cells).length).toBe(expected);
        });
    });

    describe(`::onSubmit`, () => {
        it(`on click onSubmit handler should be called`, () => {
            let model = undefined;

            const props = { ...defaultProps };
            props.onSubmit = (v) => { model = v; };

            const component = shallow(<GameInitiationHandler {...props} />);
            component.find(`button`).simulate('click');

            expect(model).toBeDefined();
        });
    });
});
