import CellModel from "../model/cell_model";

export default class Generator {
    /**
     * @param {Number} x
     * @param {Number} y
     *
     * @returns {CellModel}
     */
    static generate(x, y) {
        return new CellModel(`${String.fromCharCode(96 + x).toUpperCase()}${y}`);
    }
}