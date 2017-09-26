import BattlefieldModel from "../../model/battlefield_model";
import CellGenerator from "./cell_generator";

export default class BattlefieldGenerator {
    /**
     * @param {Number} size
     *
     * @returns {BattlefieldModel}
     */
    static generate(size) {
        const cells = [];
        for (let x = 1; x <= size; x++) {
            for (let y = 1; y <= size; y++) {
                const cell = CellGenerator.generate(x, y);

                cells.push(cell);
            }
        }

        const model = new BattlefieldModel();
        model.size = size;
        model.setCells(cells);

        return model;
    }
}
