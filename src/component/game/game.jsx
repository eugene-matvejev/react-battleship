import React from 'react';
import PropTypes from 'prop-types';
import { Battlefield, Player } from '../';
import { GameModel } from '../../model';
import '../../stylesheets/css/component/game.css';

const Game = ({ model, className }) =>
    <div className={`component game ${className}`}>
        {
            model.battlefields.map((battlefield, key) =>
                <div key={key} className='col-md-6'>
                    <Player {...battlefield.getPlayer() } />
                    <Battlefield model={battlefield} />
                </div>
            )
        }
    </div>;

Game.propTypes = {
    model: PropTypes.instanceOf(GameModel).isRequired,
    className: PropTypes.string,
};

Game.defaultProps = {
    className: '',
};

export default Game;
