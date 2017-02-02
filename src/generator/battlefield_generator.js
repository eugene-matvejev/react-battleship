import Battlefield from "../model/battlefield_model";
import Cell from "../model/cell_model";

export default class BattlefieldGenerator {
    /**
     * @param {Number} size
     * @returns {Battlefield}
     */
    static generate(size) {
        const battlefield = new Battlefield();

        for (let x = 1; x <= size; x++) {
            battlefield.addDecorationCell(Cell.generate(x, x));

            for (let y = 1; y <= size; y++) {
                const cell = Cell.generate(x, y);

                battlefield.addCell(cell);
            }
        }

        return battlefield;
    }
}