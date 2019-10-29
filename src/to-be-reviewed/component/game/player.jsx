import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ className, name, score, byteSeq, avatarSrc }) => {
    const attributes = {
        'data-byte-sequence': byteSeq,
    };

    return <div className={`component player ${className}`} {...attributes}>
        <div className='avatar'>
            <img src={avatarSrc} alt='avatar pic' />
        </div>
        <div className='name'>{name}</div>
        <div className='score'>{score}</div>
    </div>;
};

Player.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    byteSeq: PropTypes.number,
    avatarSrc: PropTypes.string,
};

Player.defaultProps = {
    byteSeq: 0,
    className: ``,
    name: `< player Name >`,
    score: `< player Score >`,
    avatarSrc: `/assets/img/avatar-placeholder.png`,
};

export default Player;
