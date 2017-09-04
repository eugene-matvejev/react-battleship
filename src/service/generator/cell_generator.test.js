import CellGenerator from "./cell_generator";

describe(`generator:: <CellGenerator/>`, () => {
    const dataProvider = [
        {x: 1, y: 1, coordinate: 'A1'},
        {x: 1, y: 2, coordinate: 'A2'},
        {x: 2, y: 3, coordinate: 'B3'}
    ];

    dataProvider.forEach(data => {
        it(`expected coordinate: '${data.coordinate}' of generated cell using x: ${data.x}, y: ${data.y}`, () => {
            const cell = CellGenerator.generate(data.x, data.y);

            expect(cell.coordinate).toBe(data.coordinate);
        });
    })
});