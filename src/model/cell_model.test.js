import CellModel from "./cell_model";

describe(`model:: Cell`, () => {
    const dataProvider = [
        {coordinate: 'A1', letter: 'A', digit: 1},
        {coordinate: 'A2', letter: 'A', digit: 2},
        {coordinate: 'B2', letter: 'B', digit: 2}
    ];

    describe(`constructor - should inject coordinate`, () => {
        it(`::constructor - mandatory fields [coordinate|byte_sequence] should be initialized`, () => {
            const model = new CellModel('A1');

            expect(model.coordinate).toBeDefined();
            expect(model.byte_sequence).toBeDefined();
            expect(model.byte_sequence).toBe(0);
        });

        dataProvider.forEach(data => it(`::constructor - injected coordinate "${data.coordinate}" should be encapsulated`, () => {
            const cell = new CellModel(data.coordinate);

            expect(cell.getCoordinate()).toBe(data.coordinate);
        }));
    });

    describe(`coordinate formatting`, () => {
        dataProvider.forEach(data => it(`::getCoordinateCharacter on coordinate ${data.coordinate}`, () => {
            expect(CellModel.getCoordinateCharacter(data.coordinate)).toBe(data.letter);
        }));

        dataProvider.forEach(data => it(`::getCoordinateDigits on coordinate ${data.coordinate}`, () => {
            expect(CellModel.getCoordinateDigit(data.coordinate)).toBe(data.digit);
        }));
    });
});