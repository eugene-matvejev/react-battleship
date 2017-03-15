import BytesAwareModel from './abstract_bytes_aware_model'

export default class PlayerModel extends BytesAwareModel {
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
}