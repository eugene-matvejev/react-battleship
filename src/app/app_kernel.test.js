import React from "react";
import {shallow} from "enzyme"
import AppKernel from "./app_kernel";

describe(`component:: <AppKernel/>`, () => {
    describe('::render', () => {
        it(`renders without crash`, () => {
            shallow(<AppKernel/>);
        });
    });
});
