import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import { generateBattlefield } from '../service';
import { Battlefield } from '../component/index';
import '../stylesheets/css/game_initiation_handler.css';

export default class GameInitiationHandler extends Component {
    constructor({ defaultSize, defaultOpponents }) {
        super();

        this.state = {
            opponents: defaultOpponents,
            size: defaultSize,
            model: generateBattlefield(defaultSize),
        };

        this.reset.bind(this);
    }

    render() {
        const { onSubmit, minSize, maxSize, minOpponents, maxOpponents } = this.props;
        const { opponents, size, model } = this.state;


        return <div className="handler game-initiation">
            <Slider min={minOpponents} max={maxOpponents} value={opponents} onChange={(v) => this.reset('opponents', v)} />
            <div className="opponents-placeholder">
                {opponents} x <span className={`fa fa-user-circle`} />
            </div>
            <Slider min={minSize} max={maxSize} value={size} onChange={(v) => this.reset('size', v)} />
            <Battlefield model={model} />

            <button onSubmit={onSubmit}>inititate game</button>
        </div>
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
        defaultSize: PropTypes.number,
        onSubmit: PropTypes.number.isRequired,
        minSize: PropTypes.number.isRequired,
        maxSize: PropTypes.number.isRequired,
        defaultOpponents: PropTypes.number,
        minOpponents: PropTypes.number,
        maxOpponents: PropTypes.number.isRequired,
    };

    static defaultProps = {
        className: '',
        defaultOpponents: 1,
        defaultSize: 10,
        minOpponents: 1,
    }
}
