import GameProcessor from "./game_processor";

describe('processor:: Game', () => {
    it('constructor - mandatory fields are defined [', () => {
        const size = 10;
        const opponents = 2;

        const processor = new GameProcessor(size, opponents);

        expect(processor.size).toBeDefined();
        expect(processor.size).toBe(size);
        expect(processor.opponents).toBeDefined();
        expect(processor.opponents).toBe(opponents);
        expect(processor.battlefields).toBeDefined();
        expect(Array.isArray(processor.battlefields)).toBe(true);
    });
});
