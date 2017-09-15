import React, {Component} from "react";
import PropTypes from "prop-types";
import Game from "../component/game";
import GameGenerator from "../service/generator/game_generator";
import Slider from "react-rangeslider";
import parameters from "../parameters.json";
import "react-rangeslider/lib/index.css";
import "../stylesheets/css/overwritten.css";
import "../stylesheets/css/common.css";
import "../stylesheets/css/game_handler.css";

export default class GameHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opponents: props.opponents,
            size: props.size,
            model: this.constructor.generateModel(props.opponents, props.size)
        }
    }

    render() {
        const size = this.state.size;
        const minSize = parameters.minGameSize;
        const maxSize = parameters.maxGameSize;

        const opponents = this.state.opponents;
        const maxOpponents = parameters.maxOpponents;

        const model = this.state.model;

        return (
            <div className="handler game">
                <div className="handler-label">{this.props.label}</div>
                <fieldset>
                    <div>opponents: {opponents}</div>
                    <Slider min={1} max={maxOpponents} value={opponents} onChange={(v) => this.reset('opponents', v)}/>
                    <div>game size: {size}</div>
                    <Slider min={minSize} max={maxSize} value={size} onChange={(v) => this.reset('size', v)}/>
                </fieldset>

                <Game model={model}/>
            </div>
        );
    }

    /**
     * @param {string} field
     * @param {any} value
     */
    reset(field, value) {
        const state = this.state;
        state[field] = value;

        state.model = this.constructor.generateModel(state.opponents, state.size);
        this.setState(state);
    }

    /**
     * @param {Number} opponents
     * @param {Number} size
     * @return {GameModel}
     */
    static generateModel(opponents, size) {
        return GameGenerator.generate((opponents + 1), size);
    }

    static propTypes = {
        opponents: PropTypes.number,
        size: PropTypes.number,
        label: PropTypes.string
    };

    static defaultProps = {
        opponents: 1,
        size: parameters.maxGameSize,
        label: 'current game'
    }
}
