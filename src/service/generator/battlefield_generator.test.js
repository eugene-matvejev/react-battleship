import BattlefieldGenerator from "./battlefield_generator";

describe(`generator:: <BattlefieldGenerator/>`, () => {
    const dataProvider = [1, 2, 3, 10, 15];

    dataProvider.forEach(size => {
        const expected = size * size;

        it(`expected ${expected} cells in generated battlefield with size: ${size}`, () => {
            const battlefield = BattlefieldGenerator.generate(size);

            expect(Object.keys(battlefield.getCells()).length).toBe(expected)
        })
    })
});