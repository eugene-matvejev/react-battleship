import PlayerModel from "./player_model";

describe(`model:: Player`, () => {
    const model = new PlayerModel();

    it(`::constructor - mandatory fields [id|username|email|bytes] are initialized`, () => {
        expect(model.id).toBeDefined();
        expect(model.username).toBeDefined();
        expect(model.email).toBeDefined();
        expect(model.bytes).toBeDefined();
    });

    [1, 2, 3].forEach(id => {
        it(`::(get|set)Id :: "${id}"`, () => {
            model.setId(id);
            expect(model.getId()).toBe(id)
        });
    });

    ['example@example.com', 'test@test.test'].forEach(username => {
        it(`::(get|set)Username :: "${username}"`, () => {
            model.setUsername(username);
            expect(model.getUsername()).toBe(username)
        });
    });

    ['example@example.com', 'test@test.test'].forEach(email => {
        it(`::(get|set)Email :: "${email}"`, () => {
            model.setEmail(email);
            expect(model.getEmail()).toBe(email)
        });
    });
});