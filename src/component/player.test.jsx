import React from "react";
import ReactDOM from "react-dom";
import Component from "./player";
import PlayerModel from "../model/player_model";

describe(`component:: Player`, () => {
    describe(`::render`, () => {
        it(` - renders without error`, () => {
            const div = document.createElement(`div`);
            const playerModel = new PlayerModel();
            playerModel.setEmail('example@example.com');
            playerModel.setUsername('example-username');


            ReactDOM.render(<Component model={playerModel}/>, div);
        });
    });
});
