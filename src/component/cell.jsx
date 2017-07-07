import React from "react";
import AbstractComponent from "./abstract_component";
import CellModel from "../model/cell_model";
import "../stylesheets/css/cell.css";

export default class Cell extends AbstractComponent {
    render() {
        const attributes = {
            'data-id': '<cell-id>',
            'data-bytes': this.props.model.getBytes(),
            'data-coordinate': this.props.model.getCoordinate(),
        };

        return (
            <div className={`col-md-1 battlefield-cell ${this.props.className || ''}`} {...attributes}>
                { this.props.model.getCoordinate() }
            </div>
        );
    }

    static PropTypes = {
        model: React.PropTypes.objectOf(CellModel).isRequired,
        className: React.PropTypes.className
    }
}
