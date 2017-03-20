import BytesAwareModel from "./abstract_bytes_aware_model";

const FLAG_NONE = 0x00;
const FLAG_DEAD = 0x01;
const FLAG_SHIP = 0x02;
const FLAG_SKIP = 0x04;
/** const FLAG_DEAD_SHIP = FLAG_SHIP | FLAG_DEAD; */

export default class CellModel extends BytesAwareModel {
    constructor(coordinate) {
        super();

        this.coordinate = coordinate;
    }

    static getCoordinateCharacter(coordinate) {
        return coordinate.charAt(0);
    }

    static getCoordinateDigit(coordinate) {
        return parseInt(coordinate.substring(1));
    }

    getCoordinate() {
        return this.coordinate;
    }

    static flags = {
        none: FLAG_NONE,
        dead: FLAG_DEAD,
        ship: FLAG_SHIP,
        skip: FLAG_SKIP
    }
}