import calc from "node-bytes-calculator";

export default class AbstractBytesAwareModel {
    constructor() {
        this.bytes = 0x00;
    }

    hasBytes(bytes) {
        return calc.hasBytes(this.bytes, bytes);
    }

    addBytes(bytes) {
        this.bytes = calc.addBytes(this.bytes, bytes);
    }

    removeBytes(bytes) {
        this.bytes = calc.removeBytes(this.bytes, bytes);
    }

    getBytes() {
        return this.bytes;
    }

    setBytes(bytes) {
        this.bytes = bytes;
    }
}
