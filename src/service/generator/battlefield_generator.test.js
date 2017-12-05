import { generateBattlefield } from './battlefield_generator';

describe(`generator:: Battlefield`, () => {
    [1, 2, 3, 10, 15].forEach((size) => {
        const expected = size ** 2;

        it(`expected ${expected} cells in generated battlefield with size: ${size}`, () => {
            const battlefield = generateBattlefield(size);

            expect(Object.keys(battlefield.getCellsIndexedByCoordinate()).length).toBe(expected);
        });
    });
});
