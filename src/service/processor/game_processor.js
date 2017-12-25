export default class GameProcessor {
    constructor(size, opponents) {
        this.size = size;
        this.opponents = opponents;
        this.battlefields = [];
    }

    /**
     * @param {{id: {number}, coordinate: {string}}} criteria
     */
    /** findCellByCriteria(criteria) {
        let cell = this.cells.find(cell =>
            (undefined !== criteria.id && cell.id === criteria.id) ||
            (undefined !== criteria.coordinate && cell.coordinate === criteria.coordinate)
        );
        if (undefined !== cell) {
            return cell;
        }

        throw `cell by criteria ${JSON.stringify(criteria)} not found`;
    } */
}
