import React from "react";
import AbstractComponent from "./abstract_component";
import PlayerModel from '../model/player_model';
import '../stylesheets/css/player.css';

export default class Player extends AbstractComponent {
    render() {
        /** @param {PlayerModel} model */
        const model = this.props.model;

        const attributes = {
            'data-player-id': model.getId(),
            'data-player-flag': model.getBytes(),
        };

        return (
            <fieldset className={`battlefield-player ${this.props.className || ''}`} {...attributes}>
                <div className="player-avatar">
                    <img src="/assets/img/avatar-placeholder.png" alt="avatar pic"/>
                </div>
                <div className="player-name">{'< playerName >'}</div>
                <div className="player-score">{'< playerScore >'}</div>
            </fieldset>
        );
    }

    static PropTypes = {
        model: React.PropTypes.objectOf(PlayerModel).isRequired,
        className: React.PropTypes.string,
    }
}
