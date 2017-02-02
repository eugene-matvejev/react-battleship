import BattlefieldGenerator from "./battlefield_generator";

describe('Battlefield Generator', () => {
    const dataProvider = [1, 2, 3, 10, 15];

    dataProvider.forEach(size =>
        it(`expected ${size * size} cells in generated battlefield with size: ${size}`, () => {
            const battlefield = BattlefieldGenerator.generate(size);

            expect(Object.keys(battlefield.getCells()).length).toBe(size * size)
        })
    )
});