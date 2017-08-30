import AbstractByteSequenceAwareModel from "./abstract_byte_sequence_aware_model";

const FLAG_HUMAN_CONTROLLED = 0x01;

export default class PlayerModel extends AbstractByteSequenceAwareModel {
    constructor() {
        super();

        this.id = 'undefined';
        this.username = this.email = 'undefined';
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    isHumanControlled() {
        return this.hasSequence(this.constructor.getHumanFlag());
    }

    static getHumanFlag() {
        return FLAG_HUMAN_CONTROLLED;
    }
}
