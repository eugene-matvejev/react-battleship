import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from './';
import { BattlefieldModel, CellModel } from '../model';
import '../stylesheets/css/battlefield.css';

const Battlefield = ({ model, className }) => {
    const attributes = {
        'data-player-id': 'unk',
        'data-player-flags': 'unk'
    }

    const coordinates = Object.keys(model.getCellsIndexedByCoordinate());
    const size = model.size;
    const rows = (new Array(size)).fill(1);

    return (
        <fieldset className={`component battlefield-cells ${className}`} {...attributes}>
            <div className='battlefield-cells-row'>
                <Cell />
                {
                    coordinates
                        .slice(0, size)
                        .map((v) => {
                            const coordinate = CellModel.getCoordinateDigit(v);

                            return <Cell key={coordinate} coordinate={coordinate} />
                        })
                }
            </div>
            {
                rows.map((value, index) =>
                    <div key={index} className='battlefield-cells-row'>
                        <Cell coordinate={CellModel.getCoordinateCharacter(coordinates[size * index])} />
                        {
                            coordinates
                                .slice(size * index, size * (1 + index))
                                .map((v) => {
                                    const cell = model.getCellByCoordinate(v);

                                    return <Cell key={cell.coordinate} {...cell} />;
                                })
                        }
                    </div>
                )
            }
        </fieldset>
    )
};

Battlefield.propTypes = {
    className: PropTypes.string,
    model: PropTypes.instanceOf(BattlefieldModel).isRequired,
};

Battlefield.defaultProps = {
    className: '',
};

export default Battlefield;
