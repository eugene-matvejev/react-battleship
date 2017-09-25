import AbstractByteSequenceAwareModel from "./abstract_byte_sequence_aware_model";

const FLAG_HUMAN_CONTROLLED = 0x01;

export default class PlayerModel extends AbstractByteSequenceAwareModel {
    constructor() {
        super();

        this.id = 'undefined';
        this.name = 'undefined';
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(v) {
        this.name = v;
    }

    isHumanControlled() {
        return this.hasSequence(this.constructor.getHumanFlag());
    }

    static getHumanFlag() {
        return FLAG_HUMAN_CONTROLLED;
    }
}
