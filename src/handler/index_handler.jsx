import React from "react";
import Battlefield from "../component/battlefield";
import Cell from "../component/cell";
import Player from "../component/player";
import PlayerModel from '../model/player_model';
import BattlefieldGenerator from "../generator/battlefield_generator";

export default class Handler extends React.Component {
    render() {
        const battlefieldModel = BattlefieldGenerator.generate(10);
        const playerModel = new PlayerModel();
        playerModel.setEmail('example@example.com');
        playerModel.setUsername('example-username');

        return (
            <div>
                <Player model={playerModel}/>
                <Battlefield model={battlefieldModel}/>
            </div>
        );
    }
}