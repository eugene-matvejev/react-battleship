export default class CellModel {
    constructor(coordinate) {
        this.coordinate = coordinate;
    }

    static getCoordinateCharacter(coordinate) {
        return coordinate.charAt(0);
    }

    static getCoordinateDigit(coordinate) {
        return parseInt(coordinate.substring(1));
    }
}