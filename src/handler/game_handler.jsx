import React from 'react';
import PropTypes from 'prop-types';
import { Game } from '../component';
import GameModel from '../model/game_model';
import 'react-rangeslider/lib/index.css';
import '../stylesheets/css/overwritten.css';
import '../stylesheets/css/common.css';
import '../stylesheets/css/game_handler.css';

const GameHandler = ({ label, model }) =>
    <div className='handler game'>
        <div className='handler-label'>{label}</div>
        <Game model={model} />
    </div>;

GameHandler.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    model: PropTypes.instanceOf(GameModel).isRequired,
};

GameHandler.defaultProps = {
    className: '',
    label: 'current game',
};

export default GameHandler;
