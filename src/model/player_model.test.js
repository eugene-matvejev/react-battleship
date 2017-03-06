import PlayerModel from "./player_model";

describe(`model:: Player`, () => {
    it(`::constructor - mandatory fields [id|username|email|flags] are initialized`, () => {
        const model = new PlayerModel(1, '', '', 0);

        expect(model.id).toBeDefined();
        expect(model.username).toBeDefined();
        expect(model.email).toBeDefined();
        expect(model.flags).toBeDefined();
    })
});