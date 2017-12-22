import { GameModel } from './';

describe(`model:: <GameModel/>`, () => {
    describe(`::constructor`, () => {
        it(`mandatory fields [battlefields] are initialized`, () => {
            const model = new GameModel();

            expect(model.battlefields).toBeDefined();
        });

        it(`mandatory field [battlefields] should be array`, () => {
            const model = new GameModel();

            expect(Array.isArray(model.battlefields)).toBe(true);
        });
    });
});
