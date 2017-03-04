import Cell from "./cell_model";

describe(`model:: Cell`, () => {
    const dataProvider = [
        {coordinate: 'A1', letter: 'A', digit: 1},
        {coordinate: 'A2', letter: 'A', digit: 2},
        {coordinate: 'B2', letter: 'B', digit: 2}
    ];

    dataProvider.forEach(data => it(`cell model: constructor on coordinate ${data.coordinate}`, () => {
        const cell = new Cell(data.coordinate);

        expect(cell.coordinate).toBe(data.coordinate);
    }));

    dataProvider.forEach(data => it(`cell model: getCoordinateCharacter on coordinate ${data.coordinate}`, () => {
        expect(Cell.getCoordinateCharacter(data.coordinate)).toBe(data.letter);
    }));

    dataProvider.forEach(data => it(`cell model: getCoordinateDigits on coordinate ${data.coordinate}`, () => {
        expect(Cell.getCoordinateDigit(data.coordinate)).toBe(data.digit);
    }));
});