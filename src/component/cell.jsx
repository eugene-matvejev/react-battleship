import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/css/cell.css";

const Cell = (props) => {
    const attributes = {
        'data-id': props.id,
        'data-byte-sequence': props.byte_sequence,
    };

    return <div className={`component battlefield-cell ${props.className}`} {...attributes}>{props.coordinate}</div>;
};

Cell.propTypes = {
    className: PropTypes.string,
    coordinate: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    byte_sequence: PropTypes.number,
};

Cell.defaultProps = {
    className: '',
};

export default Cell;
