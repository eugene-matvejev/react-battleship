import React from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';
import { BattlefieldModel, CellModel } from '../../model';

const Battlefield = ({ className, model }) => {
    const attributes = {
        'data-player-id': 'unk',
        'data-player-flags': 'unk',
    };

    const coordinates = Object.keys(model.getCellsIndexedByCoordinate());
    const { size } = model;
    const rows = (new Array(size)).fill(1);

    return <fieldset className={`component battlefield ${className}`} {...attributes}>
        <div className='cells-container'>
            <Cell />
            { /** top decoration cells */
                coordinates
                    .slice(0, size)
                    .map((v) => <Cell key={v} coordinate={CellModel.getCoordinateDigit(v)} />)
            }
        </div>
        {
            rows.map((v, index) =>
                <div key={index} className='cells-container'>
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
