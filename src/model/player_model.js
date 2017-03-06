export default class PlayerModel {
    constructor(id, username, email, flags) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.flags = flags;
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

    getFlags() {
        return this.flags;
    }

    setFlags(flags) {
        this.flags = flags;
    }
}