import BytesAwareModel from "./abstract_bytes_aware_model";

export default class GameModel extends BytesAwareModel {
    constructor() {
        super();

        this.battlefields = [];
    }

    addBattlefield(battlefield) {
        this.battlefields.push(battlefield);
    }

    getBattlefields() {
        return this.battlefields;
    }
}
