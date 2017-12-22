import React, { Component } from "react";
import PropTypes from "prop-types";
import { Battlefield, Player } from "./";
import { GameModel } from "../model";
import "../stylesheets/css/game.css";

export default class Game extends Component {
    render() {
        const model = this.props.model;

        return (
            <div className={`component battlefield-game ${this.props.className}`}>
                {
                    model.battlefields.map((battlefield, key) =>
                        <div key={`${key}-${battlefield.size}`} className="col-md-6">
                            <Player {...battlefield.getPlayer()}/>
                            <Battlefield model={battlefield}/>
                        </div>
                    )
                }
            </div>
        );
    }

    static propTypes = {
        className: PropTypes.string,
        model: PropTypes.instanceOf(GameModel).isRequired,
    };

    static defaultProps = {
        className: '',
    };
}
