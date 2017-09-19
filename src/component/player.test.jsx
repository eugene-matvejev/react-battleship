import React from "react";
import {shallow} from "enzyme";
import Player from "./player";
import PlayerModel from "../model/player_model";

describe(`component:: <Player/>`, () => {
    describe(`::render`, () => {
        it(` - renders without error`, () => {
            const model = new PlayerModel();
            model.setEmail('example@example.com');
            model.setUsername('example-username');

            shallow(<Player model={model}/>);
        });
    });
});
