import React from "react";
import PropTypes from "prop-types";
import AbstractComponent from "./abstract_component";
import Cell from "./cell";
import CellModel from "../model/cell_model";
import BattlefieldModel from "../model/battlefield_model";
import "../stylesheets/css/battlefield.css";

export default class Battlefield extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state.model = props.model;
        this.state.attributes = {
            'data-player-id': 'unk',
            'data-player-flags': 'unk'
        }
    }

    render() {
        const model = this.state.model;
        const coordinates = Object.keys(model.getCells());
        const size = model.size;
        const rows = (new Array(model.size)).fill(1);

        return (
            <div className={`battlefield-cells ${this.props.className || ''}`} {...this.getAttributes()}>
                <div className="battlefield-cells-row">
                    <Cell model={new CellModel('')}/>
                    {
                        coordinates
                            .slice(0, size)
                            .map(coordinate => <Cell key={CellModel.getCoordinateDigit(coordinate)}
                                                     model={new CellModel(CellModel.getCoordinateDigit(coordinate))}/>)
                    }
                </div>
                {
                    rows.map((value, index) =>
                        <div key={index} className="battlefield-cells-row">
                            <Cell model={new CellModel(CellModel.getCoordinateCharacter(coordinates[size * index]))}/>
                            {
                                coordinates
                                    .slice(size * index, size * (1 + index))
                                    .map(coordinate => <Cell key={coordinate} model={model.getCell(coordinate)}/>)
                            }
                        </div>
                    )
                }
            </div>
        )
    }

    calculateCellRows(size) {
        const cells = [];

        for (let i = 0; i <= size; i++) {
            const cellRow = [];

            for (let j = 0; i <= size; j++) {

            }

            cells.push(cellRow);
        }
    }

    static propTypes = {
        model: PropTypes.instanceOf(BattlefieldModel).isRequired,
        className: PropTypes.string,
    }
}
