import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '../';
import { BattlefieldModel, CellModel } from '../../model';
import '../../stylesheets/css/battlefield.css';

const Battlefield = ({ model, className }) => {
    const attributes = {
        'data-player-id': 'unk',
        'data-player-flags': 'unk'
    };

    const coordinates = Object.keys(model.getCellsIndexedByCoordinate());
    const { size } = model;
    const rows = (new Array(size)).fill(1);

    return <fieldset className={`component battlefield-cells ${className}`} {...attributes}>
        <div className='battlefield-cells-row'>
            <Cell />
            { /** top decoration cells */
                coordinates
                    .slice(0, size)
                    .map((v) => <Cell key={v} coordinate={CellModel.getCoordinateDigit(v)} />)
            }
        </div>
        {
            rows.map((v, index) =>
                <div key={index} className='battlefield-cells-row'>
                    { /** left decoration cell */ }
                    <Cell coordinate={CellModel.getCoordinateCharacter(coordinates[size * index])} />
                    {
                        coordinates
                            .slice(size * index, size * (1 + index))
                            .map((v) => <Cell key={v} {...model.getCellByCoordinate(v)} />)
                    }
                </div>
            )
        }
    </fieldset>;
};

Battlefield.propTypes = {
    className: PropTypes.string,
    model: PropTypes.instanceOf(BattlefieldModel).isRequired,
};

Battlefield.defaultProps = {
    className: '',
};

export default Battlefield;
