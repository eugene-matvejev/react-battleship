import React from "react";
import PropTypes from 'prop-types';
import PlayerModel from "../model/player_model";
import "../stylesheets/css/player.css";

const Player = (props) => {
    const attributes = {
        'data-id': props.id,
        'data-byte-sequence': props.byte_sequence,
    };

    return (
        <div className={`component battlefield-player ${props.className}`} {...attributes}>
            <div className="player-avatar">
                <img src={props.avatarSrc} alt="avatar pic"/>
            </div>
            <div className="player-name">{props.name}</div>
            <div className="player-score">{props.score}</div>
        </div>
    );
};

Player.propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    name: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    score: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    byte_sequence: PropTypes.number,
    avatarSrc: PropTypes.string
};

Player.defaultProps = {
    byte_sequence: 0,
    className: ``,
    id: `< player id >`,
    name: `< player Name >`,
    score: `< player Score >`,
    avatarSrc: `/assets/img/avatar-placeholder.png`,
};

export default Player;
