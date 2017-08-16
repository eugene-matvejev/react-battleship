import React from "react";
import PropTypes from "prop-types";
import Game from "../component/game";
import generator from "../generator/game_generator";
import Slider from "react-rangeslider";
import parameters from "../parameters.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-rangeslider/lib/index.css";
import "../stylesheets/css/overwritten.css";

export default class Handler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opponents: props.opponents,
            size: props.size,
            model: this.constructor.generateModel(props.opponents, props.size)
        }
    }

    render() {
        const opponents = this.state.opponents;
        const size      = this.state.size;
        const model     = this.state.model;

        const minGameSize = parameters.minGameSize;
        const maxGameSize = parameters.maxGameSize;

        const maxOpponents = parameters.maxOpponents;

        return (
            <div>
                <fieldset className="col-md-3">
                    <div>opponents: {opponents}</div>
                    <Slider min={1} max={maxOpponents} value={opponents} onChange={(val) => this.reset('opponents', val).bind(this)}/>
                    <div>game size: {size}</div>
                    <Slider min={minGameSize} max={maxGameSize} value={size} onChange={(val) => this.reset('size', val).bind(this)}/>
                </fieldset>

                <Game className="col-md-12" model={model}/>
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
        return generator.generate((opponents + 1), size);
    }

    static propTypes = {
        opponents: PropTypes.number,
        size: PropTypes.number
    };

    static defaultProps = {
        opponents: 1,
        size: parameters.maxGameSize
    }
}
