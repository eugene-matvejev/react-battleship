import BytesAwareModel from './abstract_bytes_aware_model'

export default class GameModel extends BytesAwareModel {
    constructor() {
        super();

        this.size = 0;
        this.battlefields = [];
    }
}
