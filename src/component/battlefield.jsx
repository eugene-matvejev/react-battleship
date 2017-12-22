import React, { Component } from "react";
import PropTypes from "prop-types";
import { Cell } from "./";
import { BattlefieldModel, CellModel } from "../model";
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
        const coordinates = Object.keys(model.getCellsIndexedByCoordinate());
        const size = model.size;
        const rows = (new Array(size)).fill(1);

        return (
            <fieldset className={`component battlefield-cells ${this.props.className}`} {...this.state.attributes}>
                <div className="battlefield-cells-row">
                    <Cell/>
                    {
                        coordinates
                            .slice(0, size)
                            .map((v) => {
                                const coordinate = CellModel.getCoordinateDigit(v);

                                return <Cell key={coordinate} coordinate={coordinate}/>
                            })
                    }
                </div>
                {
                    rows.map((value, index) =>
                        <div key={index} className="battlefield-cells-row">
                            <Cell coordinate={CellModel.getCoordinateCharacter(coordinates[size * index])}/>
                            {
                                coordinates
                                    .slice(size * index, size * (1 + index))
                                    .map((v) => {
                                        const cell = model.getCellByCoordinate(v);

                                        return <Cell key={cell.coordinate} {...cell}/>;
                                    })
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
    };

    static defaultProps = {
        className: '',
    };
}
