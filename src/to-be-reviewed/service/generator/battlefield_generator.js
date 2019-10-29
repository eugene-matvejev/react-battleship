import BattlefieldModel from '../../model/battlefield_model';
import { generateCell } from './cell_generator';

/**
 * @param {Number} size
 *
 * @returns {BattlefieldModel}
 */
export const generateBattlefield = (size) => {
    const cells = [];
    for (let x = 1; x <= size; x++) {
        for (let y = 1; y <= size; y++) {
            const cell = generateCell(x, y);

            cells.push(cell);
        }
    }

    const model = new BattlefieldModel();
    model.size = size;
    model.setCells(cells);

    return model;
};
