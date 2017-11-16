import React from "react";
import PropTypes from "prop-types";
import Battlefield from "./battlefield";
import Player from "./player";
import GameModel from "../model/game_model";
import "../stylesheets/css/game.css";

const Game = ({ model, className }) =>
    <div className={`component battlefield-game ${className}`}>
        {
            model.battlefields.map((battlefield, key) =>
                <div key={key} className="col-md-6">
                    <Player {...battlefield.getPlayer() } />
                    <Battlefield model={battlefield} />
                </div>
            )
        }
    </div>;

Game.propTypes = {
    model: PropTypes.instanceOf(GameModel).isRequired,
    className: PropTypes.string,
};

Game.defaultProps = {
    className: '',
};

export default Game;
