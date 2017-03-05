import GameModel from "./game_model";

describe(`model:: Game`, () => {
    it(`::constructor - mandatory fields [size|battlefields] are initialized`, () => {
        const model = new GameModel();

        expect(model.size).toBeDefined();
        expect(model.battlefields).toBeDefined();
        expect(Array.isArray(model.battlefields)).toBe(true);
    })
});