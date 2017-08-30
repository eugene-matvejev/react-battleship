import React from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import PlayerModel from "../model/player_model";

describe(`component:: Player`, () => {
    describe(`::render`, () => {
        it(` - renders without error`, () => {
            const div = document.createElement(`div`);
            const model = new PlayerModel();
            model.setEmail('example@example.com');
            model.setUsername('example-username');


            ReactDOM.render(<Player model={model}/>, div);
        });
    });
});
