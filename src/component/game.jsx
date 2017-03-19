import React from "react";
import Battlefield from "./battlefield";
import Player from "./player";
import GameModel from "../model/game_model";

export default class Game extends React.Component {
    render() {
        const model = this.props.model;

        return (
            <div>
                {
                    model.battlefields.map(battlefield =>
                        <div>
                            <Player model={battlefield.getPlayer()}/>
                            <Battlefield model={battlefield}/>
                        </div>
                    )
                }
            </div>
        );
    }

    static PropTypes = {
        model: React.PropTypes.objectOf(GameModel).isRequired
    }
}
