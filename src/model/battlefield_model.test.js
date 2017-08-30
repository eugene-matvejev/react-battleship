import BattlefieldModel from "./battlefield_model";
import CellModel from "./cell_model"
import PlayerModel from "./player_model";

describe(`model:: Battlefield`, () => {
    const dataProvider = [
        'A1', 'A2', 'B2'
    ];

    describe('::(add|get) Cell', () => {
        it(` - on single cell`, () => {
            const model = new BattlefieldModel();

            model.addCell(new CellModel('A1'));

            const keys = Object.keys(model.getCells());

            expect(model.getCell('A1')).toBeDefined();
            expect(keys.length).toBe(1);
            expect(keys).toEqual(['A1']);
        });

        it(` - expect cells ${dataProvider.toString()} to be present`, () => {
            const model = new BattlefieldModel();

            dataProvider.forEach(coordinate => model.addCell(new CellModel(coordinate)));

            const keys = Object.keys(model.getCells());

            expect(keys.length).toBe(dataProvider.length);
            expect(keys).toEqual(dataProvider);
        });
    });

    describe('::(has|get) Cell', () => {
        dataProvider.forEach(coordinate => {
            it(`expect cell ${coordinate} to be present`, () => {
                const model = new BattlefieldModel();
                const cell = new CellModel(coordinate);

                model.addCell(cell);

                expect(model.hasCell(cell)).toBe(true);
                expect(model.getCell(coordinate)).toBeDefined();
            });
        });
    });

    describe('::(remove|get) Cell', () => {
        dataProvider.forEach(coordinate => {
            it(`expect cell ${coordinate} to be not present`, () => {
                const model = new BattlefieldModel();
                const cell = new CellModel(coordinate);

                model.addCell(cell);
                model.removeCell(cell);

                expect(model.hasCell(cell)).toBe(false);
                expect(model.getCell(coordinate)).toBeUndefined();
            });
        });
    });

    describe('::(get|set) Player', () => {
        it(` - setter overwrite encapsulated value`, () => {
            const player1 = new PlayerModel();
            const player2 = new PlayerModel();

            const model = new BattlefieldModel();
            model.setPlayer(player1);

            expect(model.getPlayer()).toBe(player1);
            model.setPlayer(player2);
            expect(model.getPlayer()).toBe(player2);
        });
    });
});
