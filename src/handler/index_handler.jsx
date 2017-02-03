import React from "react";
import Battlefield from "../component/battlefield";
import Cell from "../component/cell";
import Player from "../component/player";
import BattlefieldGenerator from "../generator/battlefield_generator";

export default class Handler extends React.Component {
    render() {
        const battlefield = BattlefieldGenerator.generate(10);

        return (
            <div>
                <Battlefield model={battlefield}/>
            </div>
        );
    }
}