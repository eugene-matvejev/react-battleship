import BattlefieldModel from "../../model/battlefield_model";
import CellGenerator from "./cell_generator";

export default class BattlefieldGenerator {
    /**
     * @param {Number} size
     *
     * @returns {BattlefieldModel}
     */
    static generate(size) {
        const model = new BattlefieldModel();
        model.size = size;

        for (let x = 1; x <= size; x++) {
            model.addDecorationCell(CellGenerator.generate(x, x));

            for (let y = 1; y <= size; y++) {
                const cell = CellGenerator.generate(x, y);

                model.addCell(cell);
            }
        }

        return model;
    }
}