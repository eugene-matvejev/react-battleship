import React from 'react';
import { shallow, mount } from "enzyme";
import GameInitiationHandler from "./";

describe(`handler:: <GameInitiationHandler/>`, () => {
    describe(`render`, () => {
        const defaultProps = {
            minSize: 1,
            maxSize: 1,
            maxOpponents: 1
        };

        it(`it renders without crash`, () => {
            shallow(<GameInitiationHandler {...defaultProps} onSubmit={() => { }} />);
        });
    });
});
