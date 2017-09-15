import React from "react";
import PropTypes from 'prop-types';
import PlayerModel from "../model/player_model";
import "../stylesheets/css/player.css";

const Player = (props) => {
    const model = props.model;
    const attributes = {
        'data-player-id': model.getId(),
        'data-player-flag': model.getSequence(),
    };

    return (
        <div className={`component battlefield-player ${props.className || ''}`} {...attributes}>
            <div className="player-avatar">
                <img src="/assets/img/avatar-placeholder.png" alt="avatar pic"/>
            </div>
            <div className="player-name">{`< playerName >`}</div>
            <div className="player-score">{`< playerScore >`}</div>
        </div>
    );
};

Player.propTypes = {
    model: PropTypes.instanceOf(PlayerModel).isRequired,
    className: PropTypes.string,
};

export default Player;
