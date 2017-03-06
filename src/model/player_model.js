import AbstractBytesAwareModel from "./abstract_bytes_aware_model";

export default class PlayerModel extends AbstractBytesAwareModel {
    constructor() {
        super();

        this.id = 0;
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
}
