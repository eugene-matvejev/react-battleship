import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/css/player.css';

const Player = ({ className, name, score, byteSeq, avatarSrc }) => {
    const attributes = {
        'data-byte-sequence': byteSeq,
    };

    return (
        <div className={`component battlefield-player ${className}`} {...attributes}>
            <div className='player-avatar'>
                <img src={avatarSrc} alt='avatar pic' />
            </div>
            <div className='player-name'>{name}</div>
            <div className='player-score'>{score}</div>
        </div>
    );
};

Player.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    byteSeq: PropTypes.number,
    avatarSrc: PropTypes.string
};

Player.defaultProps = {
    byteSeq: 0,
    className: ``,
    name: `< player Name >`,
    score: `< player Score >`,
    avatarSrc: `/assets/img/avatar-placeholder.png`,
};

export default Player;
