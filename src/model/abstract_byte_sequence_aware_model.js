export default class AbstractByteSequenceAwareModel {
    constructor() {
        this.byte_sequence = 0x00;
    }

    getSequence() {
        return this.byte_sequence;
    }

    setSequence(seq) {
        this.byte_sequence = seq;
    }

    addSequence(seq) {
        this.byte_sequence |= seq;
    }

    removeSequence(seq) {
        this.byte_sequence &= ~seq;
    }

    hasSequence(seq) {
        return (this.byte_sequence & seq) === seq;
    }
}