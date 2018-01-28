import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameInitiationHandler } from './';

configure({ adapter: new Adapter() });

describe(`<GameInitiationHandler/>`, () => {
    const defaultProps = {
        minGameSize: 1,
        maxGameSize: 2,
        minOpponents: 1,
        maxOpponents: 2,
        onSubmit: () => { },
    };

    const { minGameSize, maxGameSize, minOpponents, maxOpponents } = defaultProps;

    describe(`rendering`, () => {
        it('with default/required props', () => {
            shallow(<GameInitiationHandler {...defaultProps} />);
        });
    });

    describe(`callbacks`, () => {
        describe(`onSubmit`, () => {
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

    describe(`embedded <Slider/> behaviour`, () => {
        it(`should change opponents from ${minOpponents} to ${maxOpponents}`, () => {
            const component = shallow(<GameInitiationHandler {...defaultProps} />);
            component.find(`Slider`).at(0).simulate('change', maxOpponents);

            expect(component.state('opponents')).toBe(maxOpponents);
        });

        it(`should generate & render additional cells as game size changed from ${minGameSize} to ${maxGameSize}`, () => {
            const component = shallow(<GameInitiationHandler {...defaultProps} />);
            component.find(`Slider`).at(1).simulate('change', maxGameSize);

            const expected = maxGameSize ** 2;
            const cells = component.find('Battlefield').prop('model').cellsIndexedByCoordinate;

            expect(Object.keys(cells).length).toBe(expected);
        });
    });
});
