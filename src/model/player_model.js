import AbstractByteSequenceAwareModel from './abstract_byte_sequence_aware_model';

const FLAG_HUMAN_CONTROLLED = 0x01;

export default class PlayerModel extends AbstractByteSequenceAwareModel {
    constructor() {
        super();

        this.id = 'undefined';
        this.name = 'undefined';
        this.score = 0;
        this.avatarSrc = `/assets/img/avatar-placeholder.png`;
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

    getScore() {
        return this.score;
    }

    setScore(v) {
        this.score = v;
    }

    getAvatarSrc() {
        return this.avatarSrc;
    }

    setAvatarSrc(v) {
        this.avatarSrc = v;
    }

    isHumanControlled() {
        return this.hasSequence(this.constructor.getHumanFlag());
    }

    static getHumanFlag = () => FLAG_HUMAN_CONTROLLED;
}
