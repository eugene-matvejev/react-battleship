import GameGenerator from "./game_generator";

describe(`generator:: <GameGenerator/>`, () => {
    describe(`::generate`, () => {
        [0, 1, 2, 10].forEach(number => {
            it(` - expected ${number} battlefields attached`, () => {
                const model = GameGenerator.generate(number, 1);

                expect(model.getBattlefields().length).toBe(number);
            });
        });

        [10].forEach(size => {
            it(` - expected 2 battlefields with size ${size} attached`, () => {
                const model = GameGenerator.generate(2, size);

                /** @param {BattlefieldModel} battlefieldModel */
                for (const battlefieldModel of model.getBattlefields()) {
                    const cells = battlefieldModel.getCells();

                    expect(Object.keys(cells).length).toBe(size ** 2);
                }
            });
        });
    })
});
