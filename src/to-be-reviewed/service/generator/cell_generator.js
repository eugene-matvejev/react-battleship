import CellModel from '../../model/cell_model';

/**
 * @param {Number} x
 * @param {Number} y
 *
 * @returns {CellModel}
 */
export const generateCell = (x, y) => new CellModel(`${String.fromCharCode(96 + x).toUpperCase()}${y}`);
