export default class BattlefieldModel {
    constructor() {
        this.player = undefined;
        this.id = undefined;
        this.size = 0;

        this.cells = {};
        this.decorationCells = {};
    }

    addDecorationCell(cell) {
        this.decorationCells[cell.coordinate] = cell;
    }

    addCell(cell) {
        this.cells[cell.coordinate] = cell;
    }

    hasCell(cell) {
        return undefined !== this.cells[cell.coordinate];
    }

    removeCell(cell) {
        delete this.cells[cell.coordinate];
    }

    getCell(coordinate) {
        return this.cells[coordinate] || undefined;
    }

    getCells() {
        return this.cells;
    }
}