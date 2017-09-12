import React from "react";
import PropTypes from 'prop-types';
import AbstractComponent from "./abstract_component";
import PlayerModel from "../model/player_model";
import "../stylesheets/css/player.css";

export default class Player extends AbstractComponent {
    render() {
        /** @param {PlayerModel} model */
        const model = this.props.model;

        const attributes = {
            'data-player-id': model.getId(),
            'data-player-flag': model.getSequence(),
        };

        return (
            <div className={`component battlefield-player ${this.props.className || ''}`} {...attributes}>
                <div className="player-avatar">
                    <img src="/assets/img/avatar-placeholder.png" alt="avatar pic"/>
                </div>
                <div className="player-name">{'< playerName >'}</div>
                <div className="player-score">{'< playerScore >'}</div>
            </div>
        );
    }

    static propTypes = {
        model: PropTypes.instanceOf(PlayerModel).isRequired,
        className: PropTypes.string,
    }
}
