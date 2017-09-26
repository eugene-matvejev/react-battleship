import AbstractByteSequenceAwareModel from "./abstract_byte_sequence_aware_model";

export default class GameModel extends AbstractByteSequenceAwareModel {
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
