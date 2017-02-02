import Cell from "../model/cell_model";
import GeneratorInterface from "./generator_interface";

export default class Generator implements GeneratorInterface {
    /**
     * @param {Number} x
     * @param {Number} y
     *
     * @returns {Cell}
     */
    static generate(x, y) {
        return new Cell(`${String.fromCharCode(96 + x).toUpperCase()}${y}`);
    }
}