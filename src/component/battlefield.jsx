import AbstractComponent from "./abstract_component";
import Cell from "./cell";
import CellModel from "../model/cell_model";
import React from "react";
import "../stylesheets/css/battlefield.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Battlefield extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state.model = this.props.model;
        this.state.attributes = {
            'data-player-id': 'unk',
            'data-player-flags': 'unk'
        }
    }

    render() {
        const battlefield = this.state.model;
        const coordinates = Object.keys(battlefield.getCells());
        const size = battlefield.size;
        const rows = (new Array(battlefield.size)).fill(1);

        return (
            <div className="col-md-6 battlefield" {...this.getAttributes()}>
                <div className="battlefield-cells">
                    <div className="row">
                        <Cell text=""/>
                        {
                            coordinates
                                .slice(0, size)
                                .map(coordinate => <Cell key={CellModel.getCoordinateDigit(coordinate)}
                                                         text={CellModel.getCoordinateDigit(coordinate)}/>)
                        }
                    </div>
                    {
                        rows.map((value, index) =>
                            <div key={index} className="row">
                                <Cell text={CellModel.getCoordinateCharacter(coordinates[size * index])}/>
                                {
                                    coordinates
                                        .slice(size * index, size * (1 + index))
                                        .map(coordinate => <Cell key={coordinate}
                                                                 model={battlefield.getCell(coordinate)}/>)
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    static PropTypes = {
        model: React.PropTypes.object.isRequired
    }
}

