import React from "react";
import PropTypes from "prop-types";
import AbstractComponent from "./abstract_component";
import CellModel from "../model/cell_model";
import "../stylesheets/css/cell.css";

export default class Cell extends AbstractComponent {
    render() {
        const attributes = {
            'data-id': '<cell-id>',
            'data-bytes': this.props.model.getSequence(),
            'data-coordinate': this.props.model.getCoordinate(),
        };

        return (
            <div className={`component col-md-1 battlefield-cell ${this.props.className || ''}`} {...attributes}>
                {this.props.model.getCoordinate()}
            </div>
        );
    }

    static propTypes = {
        model: PropTypes.instanceOf(CellModel).isRequired,
        className: PropTypes.string
    }
}
