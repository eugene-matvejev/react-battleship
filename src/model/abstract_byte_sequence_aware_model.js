export default class AbstractByteSequenceAwareModel {
    constructor() {
        this.byteSeq = 0x00;
    }

    getSequence() {
        return this.byteSeq;
    }

    setSequence(seq) {
        this.byteSeq = seq;
    }

    addSequence(seq) {
        this.byteSeq |= seq;
    }

    removeSequence(seq) {
        this.byteSeq &= ~seq;
    }

    hasSequence(seq) {
        return (this.byteSeq & seq) === seq;
    }
}
