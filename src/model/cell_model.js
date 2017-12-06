import AbstractByteSequenceAwareModel from './abstract_byte_sequence_aware_model';

const FLAG_NONE = 0x00;
const FLAG_DEAD = 0x01;
const FLAG_SHIP = 0x02;
/** const FLAG_DEAD_SHIP = FLAG_SHIP | FLAG_DEAD; */
const FLAG_SKIP = 0x04;

export default class CellModel extends AbstractByteSequenceAwareModel {
    constructor(coordinate) {
        super();

        this.coordinate = coordinate;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getCoordinate() {
        return this.coordinate;
    }

    static getCoordinateCharacter = (coordinate) => coordinate.charAt(0);

    static getCoordinateDigit = (coordinate) => parseInt(coordinate.substring(1), 10)

    static flags = {
        none: FLAG_NONE,
        dead: FLAG_DEAD,
        ship: FLAG_SHIP,
        skip: FLAG_SKIP
    }
}
