import BattlefieldModel from "./battlefield_model";
import CellModel from "./cell_model"
import PlayerModel from "./player_model";

describe(`model:: <BattlefieldModel/>`, () => {
    describe('::[get|set]Player', () => {
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

    const dataProvider = [
        'A1', 'A2', 'B3'
    ];
    const cellsWithUndefinedId = dataProvider.map((v) => new CellModel(v));
    const cellsWithDefinedId = dataProvider.map((v) => {
        const cell = new CellModel(v);

        cell.setId(v.slice(-1));

        return cell;
    });

    describe(`::[get|set]Cells(IndexedBy[Coordinate|Id])`, () => {
        it(`cells been indexed ONLY by coordinate`, () => {
            const model = new BattlefieldModel();
            model.setCells(cellsWithUndefinedId);

            expect(model.getCellsIndexedById()).toEqual({});

            dataProvider.forEach((v) => {
                expect(model.getCellsIndexedByCoordinate()[v].getCoordinate()).toBe(v);
            });
        });

        it(`cells been indexed BOTH by coordinate and by`, () => {
            const model = new BattlefieldModel();
            model.setCells(cellsWithDefinedId);

            dataProvider.forEach((v) => {
                const id = v.slice(-1);

                expect(model.getCellsIndexedByCoordinate()[v].getCoordinate()).toBe(v);
                expect(model.getCellsIndexedById()[id].getId()).toBe(id);
            });
        });

        describe(`::[has|get]CellBy[Coordinate|Id]`, () => {
            const model = new BattlefieldModel();
            model.setCells(cellsWithDefinedId);

            cellsWithDefinedId.forEach((c) => {
                describe(`::byCoordinate ${c.getCoordinate()}`, () => {
                    it(`::has`, () => {
                        expect(model.hasCellByCoordinate(c.getCoordinate())).toBe(true);
                    });
                    it(`::get`, () => {
                        expect(model.getCellByCoordinate(c.getCoordinate())).toBe(c);
                    });
                });
                describe(`::byId ${c.getId()}`, () => {
                    it(`::has`, () => {
                        expect(model.hasCellById(c.getId())).toBe(true);
                    });
                    it(`::get`, () => {
                        expect(model.getCellById(c.getId())).toBe(c);
                    });
                });
            });
        });
    });
});
