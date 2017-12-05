import React, {Component} from "react";
import PropTypes from "prop-types";
import { Game } from "../component";
import GameGenerator from "../service/generator/game_generator";
import Slider from "react-rangeslider";
import parameters from "../parameters.json";
import "react-rangeslider/lib/index.css";
import "../stylesheets/css/overwritten.css";
import "../stylesheets/css/common.css";
import "../stylesheets/css/game_handler.css";

export default class GameHandler extends Component {
    constructor({opponents, size}) {
        super();

        this.state = {
            opponents: opponents,
            size: size,
            model: this.constructor.generateModel(opponents, size),
        }

        this.reset.bind(this);
    }

    render() {
        const size = this.state.size;
        const minSize = parameters.minGameSize;
        const maxSize = parameters.maxGameSize;

        const opponents = this.state.opponents;
        const maxOpponents = parameters.maxOpponents;

        const model = this.state.model;

        const state = this.state;
        console.log({state});
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
    static generateModel = (opponents, size) => GameGenerator.generate((opponents + 1), size);

    static propTypes = {
        className: PropTypes.string,
        opponents: PropTypes.number,
        size: PropTypes.number,
        label: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        opponents: 1,
        size: parameters.maxGameSize,
        label: 'current game',
    }
}
