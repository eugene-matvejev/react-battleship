import BytesAwareModel from "./abstract_bytes_aware_model";

export default class GameModel extends BytesAwareModel {
    constructor() {
        super();

        this.size = 0;
        this.battlefields = [];
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    addBattlefield(battlefield) {
        this.battlefields.push(battlefield);
    }

    getBattlefields() {
        return this.battlefields;
    }

    setBattlefields(battlefields) {
        return this.battlefields = battlefields;
    }
}
