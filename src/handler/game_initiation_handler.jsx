import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import { Battlefield } from '../component';
import { generateBattlefield, generateGame } from '../service/generator';
import '../stylesheets/css/game_initiation_handler.css';

export default class GameInitiationHandler extends Component {
    constructor({ minGameSize, minOpponents }) {
        super();

        this.state = {
            opponents: minOpponents,
            size: minGameSize,
            model: generateBattlefield(minGameSize),
        };

        this.reset = this.reset.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleGameSizeChange = this.handleGameSizeChange.bind(this);
        this.handleOpponentsChange = this.handleOpponentsChange.bind(this);
    }

    render() {
        const { className, minGameSize, maxGameSize, minOpponents, maxOpponents } = this.props;
        const { opponents, size, model } = this.state;

        return <div className={`handler game-initiation ${className}`}>
            <Slider min={minOpponents} max={maxOpponents} value={opponents} onChange={this.handleOpponentsChange} />
            <div className='opponents-placeholder'>
                opponents x {opponents}
            </div>
            <Slider min={minGameSize} max={maxGameSize} value={size} onChange={this.handleGameSizeChange} />
            <Battlefield model={model} />

            <button onClick={this.handleOnSubmit}>inititate game</button>
        </div>;
    }

    handleOnSubmit() {
        const { size, opponents } = this.state;
        const { onSubmit } = this.props;

        const model = generateGame(1 + opponents, size);

        onSubmit(model);
    }

    handleGameSizeChange(v) {
        this.reset('size', v);
    }

    handleOpponentsChange(v) {
        this.reset('opponents', v);
    }

    /**
     * @param {string} field
     * @param {any} value
     */
    reset(field, value) {
        const state = this.state;
        state[field] = value;

        state.model = generateBattlefield(state.size);
        this.setState(state);
    }

    static propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        minGameSize: PropTypes.number.isRequired,
        maxGameSize: PropTypes.number.isRequired,
        minOpponents: PropTypes.number,
        maxOpponents: PropTypes.number.isRequired,
    };

    static defaultProps = {
        className: '',
        minOpponents: 1,
    }
}
