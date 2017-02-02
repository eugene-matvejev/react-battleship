import Battlefield from "../model/battlefield_model";
import CellGenerator from "./cell_generator";
import GeneratorInterface from "./generator_interface";

export default class Generator implements GeneratorInterface {
    /**
     * @param {Number} size
     * @returns {Battlefield}
     */
    static generate(size) {
        const battlefield = new Battlefield();
        battlefield.size = size;

        for (let x = 1; x <= size; x++) {
            battlefield.addDecorationCell(CellGenerator.generate(x, x));

            for (let y = 1; y <= size; y++) {
                const cell = CellGenerator.generate(x, y);

                battlefield.addCell(cell);
            }
        }

        return battlefield;
    }
}