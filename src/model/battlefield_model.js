import AbstractByteSequenceAwareModel from './abstract_byte_sequence_aware_model';

export default class BattlefieldModel extends AbstractByteSequenceAwareModel {
    constructor() {
        super();

        this.player = undefined;
        this.id = undefined;
        this.size = 0;

        this.cellsIndexedById = {};
        this.cellsIndexedByCoordinate = {};
    }

    /**
     * @param {PlayerModel} player
     */
    setPlayer(player) {
        this.player = player;
    }

    /**
     * @return {PlayerModel}
     */
    getPlayer() {
        return this.player;
    }

    hasCellByCoordinate(v) {
        return undefined !== this.cellsIndexedByCoordinate[v];
    }

    hasCellById(v) {
        return undefined !== this.cellsIndexedById[v];
    }

    getCellByCoordinate(v) {
        return this.cellsIndexedByCoordinate[v] || undefined;
    }

    getCellById(v) {
        return this.cellsIndexedById[v] || undefined;
    }

    getCellsIndexedById() {
        return this.cellsIndexedById;
    }

    getCellsIndexedByCoordinate() {
        return this.cellsIndexedByCoordinate;
    }

    /**
     * @param {{id: number, coordinate: string}[]} cells
     */
    setCells(cells) {
        this.cellsIndexedByCoordinate = {};
        this.cellsIndexedById = {};

        for (const cell of cells) {
            this.cellsIndexedByCoordinate[cell.coordinate] = cell;

            if (undefined !== cell.id) {
                this.cellsIndexedById[cell.id] = cell;
            }
        }
    }
}
