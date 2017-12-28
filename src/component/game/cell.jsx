import React from 'react';
import PropTypes from 'prop-types';
import '../../stylesheets/css/cell.css';

const Cell = ({ className, coordinate, byteSeq }) => {
    const attributes = {
        'data-byte-sequence': byteSeq,
    };

    return <div className={`component cell ${className}`} {...attributes}>{coordinate}</div>;
};

Cell.propTypes = {
    className: PropTypes.string,
    coordinate: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    byteSeq: PropTypes.number,
};

Cell.defaultProps = {
    className: '',
    byteSeq: 0,
};

export default Cell;
