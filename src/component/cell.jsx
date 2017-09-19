import React from "react";
import PropTypes from "prop-types";
import CellModel from "../model/cell_model";
import "../stylesheets/css/cell.css";

const Cell = (props) => {
    const attributes = {
        'data-id': '<cell-id>',
        'data-bytes': props.model.getSequence()
    };

    return (
        <div className={`component battlefield-cell ${props.className}`} {...attributes}>
            {props.model.getCoordinate()}
        </div>
    );
};

Cell.propTypes = {
    className: PropTypes.string,
    model: PropTypes.instanceOf(CellModel).isRequired,
};

Cell.defaultProps = {
    className: ''
};

export default Cell;
