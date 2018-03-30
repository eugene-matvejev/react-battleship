import React from 'react';
import PropTypes from 'prop-types';
import { Game } from '../component';
import { GameModel } from '../model';
import '../stylesheets/css/handler/game_handler.css';

const GameHandler = ({ className, label, model }) =>
    <div className={`handler game ${className}`}>
        <div className='label'>{label}</div>
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
