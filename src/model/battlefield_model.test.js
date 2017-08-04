import Battlefield from "./battlefield_model";
import Player from "./player_model";
import Cell from "./cell_model";

describe(`model:: Battlefield`, () => {
    const dataProvider = [
        'A1', 'A2', 'B2'
    ];

    describe('add|get cell', () => {
        it(`on single cell`, () => {
            const battlefield = new Battlefield();

            battlefield.addCell(new Cell('A1'));

            const keys = Object.keys(battlefield.getCells());

            expect(battlefield.getCell('A1')).toBeDefined();
            expect(keys.length).toBe(1);
            expect(keys).toEqual(['A1']);
        });

        it(`expect cells ${dataProvider.toString()} to be present`, () => {
            const battlefield = new Battlefield();

            dataProvider.forEach(coordinate => battlefield.addCell(new Cell(coordinate)));

            const keys = Object.keys(battlefield.getCells());

            expect(keys.length).toBe(dataProvider.length);
            expect(keys).toEqual(dataProvider);
        });
    });

    describe('has|get cell', () => {
        dataProvider.forEach(coordinate => {
            it(`expect cell ${coordinate} to be present`, () => {
                const battlefield = new Battlefield();
                const cell = new Cell(coordinate);

                battlefield.addCell(cell);

                expect(battlefield.hasCell(cell)).toBe(true);
                expect(battlefield.getCell(coordinate)).toBeDefined();
            });
        });
    });

    describe('remove|get cell', () => {
        dataProvider.forEach(coordinate => {
            it(`expect cell ${coordinate} to be not present`, () => {
                const battlefield = new Battlefield();
                const cell = new Cell(coordinate);

                battlefield.addCell(cell);
                battlefield.removeCell(cell);

                expect(battlefield.hasCell(cell)).toBe(false);
                expect(battlefield.getCell(coordinate)).toBeUndefined();
            });
        });
    });

    describe('get|set Player', () => {
       const player1 = new Player();
       const player2 = new Player();
    });
});