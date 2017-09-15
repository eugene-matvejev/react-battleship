import React, {Component} from "react";
import PropTypes from "prop-types";
import Cell from "./cell";
import BattlefieldModel from "../model/battlefield_model";
import CellModel from "../model/cell_model";
import "../stylesheets/css/battlefield.css";

export default class Battlefield extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: props.model,
            attributes: {
                'data-player-id': 'unk',
                'data-player-flags': 'unk'
            }
        }
    }

    render() {
        const model = this.state.model;
        const coordinates = Object.keys(model.getCells());
        const size = model.size;
        const rows = (new Array(size)).fill(1);

        return (
            <fieldset className={`component battlefield-cells ${this.props.className || ''}`} {...this.state.attributes}>
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
            </fieldset>
        )
    }

    static propTypes = {
        className: PropTypes.string,
        model: PropTypes.instanceOf(BattlefieldModel).isRequired,
    }
}
