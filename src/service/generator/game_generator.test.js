import { generateGame } from "./";
import PlayerModel from "../../model/player_model";

describe(`generator:: Game`, () => {
    describe(`::generate`, () => {
        [0, 1, 2, 10].forEach((v) => {
            it(`expected ${v} battlefields`, () => {
                const model = generateGame(v, 0);

                expect(model.getBattlefields().length).toBe(v);
            });
        });

        [1, 2, 10].forEach(v => {
            it(`expected last player of ${v} to be market as Human Controlled`, () => {
                const model = generateGame(v, 0);

                model.getBattlefields().forEach((bf, index) => {
                    const expectedSeq = index === (v - 1) ? PlayerModel.getHumanFlag() : 0;

                    expect(bf.getPlayer().byte_sequence).toBe(expectedSeq);
                });
            });
        });

        [0, 1, 2, 10].forEach(size => {
            const expectedCellAmount = size ** 2;

            it(`expected 2 battlefields with size ${size} attached [expected ${expectedCellAmount} cells]`, () => {
                const model = generateGame(2, size);

                /** @param {BattlefieldModel} battlefieldModel */
                for (const battlefieldModel of model.getBattlefields()) {
                    const cells = battlefieldModel.getCellsIndexedByCoordinate();

                    expect(Object.keys(cells).length).toBe(expectedCellAmount);
                }
            });
        });
    });
});
