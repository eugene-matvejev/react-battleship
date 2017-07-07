import BytesAwareModel from './abstract_bytes_aware_model'

export default class CellModel extends BytesAwareModel {
    constructor(coordinate) {
        super();

        this.coordinate = coordinate;
    }

    getCoordinate() {
        return this.coordinate;
    }

    static getCoordinateCharacter(coordinate) {
        return coordinate.charAt(0);
    }

    static getCoordinateDigit(coordinate) {
        return parseInt(coordinate.substring(1));
    }
}
